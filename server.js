const express = require("express");
const axios = require("axios");
const app = express();
const GROQ_KEY = process.env.OPENAI_KEY;

app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const r = await axios.post("https://api.groq.com/openai/v1/chat/completions", {
      model: "llama3-8b-8192",
      max_tokens: 200,
      messages: [
        { role: "system", content: "Reply briefly, 2-3 sentences max." },
        { role: "user", content: req.body.message }
      ]
    }, { headers: { Authorization: `Bearer ${GROQ_KEY}` } });
    res.json({ answer: r.data.choices[0].message.content.trim() });
  } catch(e) {
    res.status(500).json({ answer: "Error: " + e.message });
  }
});

app.listen(process.env.PORT || 3000, () => console.log("Server started"));
