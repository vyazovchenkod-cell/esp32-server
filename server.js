const express = require("express");
const axios = require("axios");

const app = express();

const GEMINI_KEY = process.env.GEMINI_KEY;

app.use(express.json());

app.post("/chat", async (req, res) => {
  try {

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text:
                  "Ти розумний асистент. Завжди відповідай ТІЛЬКИ українською мовою. Відповідай коротко, 2-3 речення.\n\n" +
                  req.body.message
              }
            ]
          }
        ]
      }
    );

    const answer =
      response.data.candidates[0].content.parts[0].text;

    res.json({ answer });

  } catch (e) {

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
