import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.get("/", (req, res) => {
  res.json({
    message: "Flam Study Assistant API is running",
  });
});

app.post("/api/generate", async (req, res) => {
  const { topic } = req.body;

  if (!topic || !topic.trim()) {
    return res.status(400).json({
      error: "Topic is required",
    });
  }

  try {
    const prompt = `
Create study flashcards for this topic:

${topic}

Return only valid JSON in this exact format:

{
  "title": "string",
  "cards": [
    {
      "id": 1,
      "question": "string",
      "answer": "string"
    }
  ]
}

Create exactly 5 flashcards.
Do not return markdown.
Do not return any text outside the JSON.
`;

    const interaction = await ai.interactions.create({
      model: "gemini-3.8-flash",
      input: prompt,
      response_format: {
        type: "text",
        mime_type: "application/json",
      },
    });

    res.json({
      result: interaction.output_text,
    });
  } catch (error) {
    console.error("Gemini error:", error);

    res.status(500).json({
      error: "Failed to generate flashcards",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});