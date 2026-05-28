const express = require("express");
const axios = require("axios");

const app = express();
const GEMINI_KEY = process.env.OPENAI_KEY;

app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const r = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`,
      {
        contents: [
          {
            parts: [
              { text: req.body.message }
            ]
          }
        ],
        systemInstruction: {
          parts: [
            {
              text: "Відповідай коротко українською мовою,  2-3 речення."
            }
          ]
        },
        generationConfig: {
          maxOutputTokens: 300
        }
      }
    );

    const answer =
      r.data.candidates[0].content.parts[0].text.trim();

    res.json({ answer });

  } catch (e) {
    console.log(
      "ERROR:",
      e.response
        ? JSON.stringify(e.response.data)
        : e.message
    );

    res.status(500).json({
      answer:
        "Error: " +
        (e.response
          ? JSON.stringify(e.response.data)
          : e.message)
    });
  }
});

app.listen(process.env.PORT || 3000, () =>
  console.log("Server started")
);
