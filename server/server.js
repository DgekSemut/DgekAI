const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.post('/api/openai', async (req,res)=>{
  if(!process.env.OPENAI_API_KEY) return res.status(500).json({error:'NO_KEY'});
  const body = req.body;
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method:'POST', headers:{'Content-Type':'application/json','Authorization':'Bearer '+process.env.OPENAI_API_KEY},
    body: JSON.stringify({model:'gpt-4o-mini', messages:[{role:'user', content: body.message}], max_tokens:500})
  });
  const data = await response.json();
  res.json({reply: data.choices?.[0]?.message?.content || ''});
});
app.listen(PORT, ()=>console.log('Server running on', PORT));
