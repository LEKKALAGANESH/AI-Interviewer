import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Load questions from file
const questions = JSON.parse(fs.readFileSync("./questions.json", "utf8"));

// ✅ Route 1: Serve interview questions
app.get("/api/questions", (req, res) => {
    res.json({ questions });
});

// ✅ Route 2: Analyze candidate answers using OpenRouter
app.post("/api/analyze", async (req, res) => {
    try {
        const { answers } = req.body;
        if (!answers || answers.length === 0) {
            return res.status(400).json({ error: "No answers provided" });
        }

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

        // ✅ Call OpenRouter API
        const completion = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "x-ai/grok-4-fast:free", // you can change to gpt-4, claude, mistral, etc.
                messages: [{ role: "user", content: prompt }],
                temperature: 0.3,
            }),
        });

        const data = await completion.json();
        console.log("OpenRouter response:", data);
        const analysis = data.choices[0].message.content;

        res.json({ analysis });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to analyze answers" });
    }
});

// ✅ Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
