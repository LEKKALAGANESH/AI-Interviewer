import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import fetch from "node-fetch";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Load questions
const questions = JSON.parse(fs.readFileSync("./questions.json", "utf8"));

// Serve questions
app.get("/api/questions", (req, res) => {
    res.json({ questions });
});

// Analyze candidate answers
app.post("/api/analyze", async (req, res) => {
    try {
        const { answers } = req.body;
        if (!answers || answers.length === 0)
            return res.status(400).json({ error: "No answers provided" });

        // Build prompt
        const prompt = `
You are an interviewer evaluating a Software Development Intern candidate.
Questions and answers:
${answers.map((a, i) => `Q${i + 1}: ${a.question}\nA: ${a.answer}`).join("\n\n")}

Please provide structured JSON with:
- Scores (0-10) for: Technical Knowledge, Problem Solving, Communication, Behavior
- Short feedback (2-3 lines) for each category
- Overall recommendation: "Hire", "Maybe", or "No Hire"
`;

        // Call OpenRouter API
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "x-ai/grok-4-fast:free",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.3
            })
        });

        const data = await response.json();
        // console.log(data);
        const analysis = data.choices[0].message.content;

        res.json({ analysis });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to analyze answers" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
