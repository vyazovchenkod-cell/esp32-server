const express = require("express");
const axios = require("axios");

const app = express();

const GEMINI_KEY = process.env.GEMINI_KEY;

app.use(express.json());

app.post("/chat", async (req, res) => {

  try {

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text:
                  "Відповідай тільки українською мовою.\n\n" +
                  req.body.message
              }
            ]
          }
        ]
      }
    );

    const answer =
      response.data.candidates[0].content.parts[0].text;

    res.json({
      answer: answer
    });

  } catch (e) {

    console.log(e.response?.data || e.message);

    res.status(500).json({
      answer: "SERVER ERROR"
    });

  }

});

app.listen(3000, () => {
  console.log("Server started");
});
