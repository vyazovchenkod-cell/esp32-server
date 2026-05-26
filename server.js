const express = require("express");
const axios = require("axios");
const app = express();
const OPENAI_KEY = process.env.OPENAI_KEY;

app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const r = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-3.5-turbo",
      max_tokens: 200,
      messages: [
        { role: "system", content: "Always reply in Ukrainian language using Latin transliteration (no Cyrillic). Reply briefly, 2-3 sentences max." },
        { role: "user", content: req.body.message }
      ]
    }, { headers: { Authorization: `Bearer ${OPENAI_KEY}` } });
    res.json({ answer: r.data.choices[0].message.content.trim() });
  } catch(e) {
    res.status(500).json({ answer: "Error: " + e.message });
  }
});

app.listen(process.env.PORT || 3000, () => console.log("Server started"));
