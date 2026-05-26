const express = require("express");
const axios = require("axios");
const app = express();
const GROQ_KEY = process.env.OPENAI_KEY;

app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const r = await axios.post("https://api.groq.com/openai/v1/chat/completions", {
      model: "llama-3.3-70b-versatile",
      max_tokens: 200,
      messages: [
        { role: "system", content: "Ти розумний асистент. Завжди відповідай ТІЛЬКИ українською мовою. Відповідай коротко, 2-3 речення." },
        { role: "user", content: req.body.message }
      ]
    }, { headers: { Authorization: `Bearer ${GROQ_KEY}` } });

    res.json({ answer: r.data.choices[0].message.content.trim() });
  } catch(e) {
    res.status(500).json({ answer: "Error: " + (e.response ? JSON.stringify(e.response.data) : e.message) });
  }
});

app.listen(process.env.PORT || 3000, () => console.log("Server started"));
