(function(){
  const btn = document.createElement('div');
  btn.id='ai-fab'; btn.style='position:fixed;right:18px;bottom:18px;width:64px;height:64px;border-radius:50%;background:linear-gradient(180deg,#6b4bff,#5b8cff);display:flex;align-items:center;justify-content:center;color:white;font-size:28px;cursor:pointer;z-index:9999';
  btn.textContent='🤖'; document.body.appendChild(btn);

  const panel = document.createElement('div'); panel.id='ai-panel';
  panel.style='position:fixed;right:18px;bottom:96px;width:340px;height:420px;background:#071026;color:#e6eef8;border-radius:12px;padding:12px;display:none;flex-direction:column;z-index:9999';
  panel.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center"><strong>AI Assistant</strong><button id="ai-close">✕</button></div><div id="ai-chat" style="flex:1;overflow:auto;margin-top:8px;padding:8px;background:rgba(255,255,255,0.03);border-radius:8px"></div><div style="display:flex;gap:8px;margin-top:8px"><input id="ai-input" style="flex:1;padding:8px;border-radius:8px;background:transparent;color:#e6eef8;border:1px solid rgba(255,255,255,0.04)" placeholder="Type a message..."><button id="ai-send" style="padding:8px 10px;border-radius:8px;background:linear-gradient(180deg,#6b4bff,#5b8cff);border:none;color:white">Send</button></div>';

  document.body.appendChild(panel);
  btn.onclick = ()=> panel.style.display = panel.style.display === 'none' ? 'flex' : 'none';
  document.getElementById('ai-close').onclick = ()=> panel.style.display='none';

  async function sendMessage(message){
    const chat = document.getElementById('ai-chat');
    chat.innerHTML += `<div style="margin-bottom:8px"><b>You:</b> ${escapeHtml(message)}</div>`;
    chat.scrollTop = chat.scrollHeight;
    const loading = document.createElement('div'); loading.id='loading'; loading.textContent='AI is typing...'; loading.style.opacity='0.8'; chat.appendChild(loading);
    try{
      const res = await fetch('/api/openai', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({message})});
      const data = await res.json();
      loading.remove();
      if(data && data.reply) chat.innerHTML += `<div style="margin-bottom:8px"><b>AI:</b> ${escapeHtml(data.reply)}</div>`;
      else chat.innerHTML += `<div style="margin-bottom:8px;color:#fca5a5">AI: No response</div>`;
    }catch(e){
      loading.remove();
      const reply = 'Demo assistant: server proxy not found. Deploy server and set /api/openai.';
      chat.innerHTML += `<div style="margin-bottom:8px"><b>AI:</b> ${escapeHtml(reply)}</div>`;
    }
    chat.scrollTop = chat.scrollHeight;
  }

  document.getElementById('ai-send').addEventListener('click', ()=>{
    const v = document.getElementById('ai-input').value.trim(); if(!v) return; document.getElementById('ai-input').value=''; sendMessage(v);
  });
  document.getElementById('ai-input').addEventListener('keydown', (e)=>{ if(e.key==='Enter'){ e.preventDefault(); document.getElementById('ai-send').click(); } });

  function escapeHtml(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
})();