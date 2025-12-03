async function askAI(question) {
    const apiKey = "YOUR_OPENAI_KEY";

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: question }]
        })
    });

    const data = await r.json();
    document.getElementById("ai-response").innerText = data.choices[0].message.content;
}
