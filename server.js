const express = require("express");
const axios = require("axios");
const app = express();
const GROQ_KEY = process.env.OPENAI_KEY;

app.use(express.json());

app.post("/chat", async (req, res) => {
  console.log("Got request:", req.body.message);
  console.log("Key starts with:", GROQ_KEY ? GROQ_KEY.substring(0, 10) : "NO KEY");
  
  try {
    const r = await axios.post("https://api.groq.com/openai/v1/chat/completions", {
      model: "llama-3.3-70b-versatile",,
      max_tokens: 200,
      messages: [
        { role: "system", content: "Reply briefly, 2-3 sentences max." },
        { role: "user", content: req.body.message }
      ]
    }, { headers: { Authorization: `Bearer ${GROQ_KEY}` } });
    
    res.json({ answer: r.data.choices[0].message.content.trim() });
  } catch(e) {
    console.log("ERROR:", e.response ? JSON.stringify(e.response.data) : e.message);
    res.status(500).json({ answer: "Error: " + (e.response ? JSON.stringify(e.response.data) : e.message) });
  }
});

app.listen(process.env.PORT || 3000, () => console.log("Server started"));
