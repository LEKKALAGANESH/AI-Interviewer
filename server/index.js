import fs from "fs";
import fetch from "node-fetch";

export default async function handler(req, res) {
    const questions = JSON.parse(fs.readFileSync("./server/questions.json", "utf8"));

    if (req.method === "GET") {
        return res.status(200).json({ questions });
    }

    if (req.method === "POST") {
        try {
            const { answers } = req.body;
            const prompt = `
You are an interviewer evaluating a Software Development Intern candidate.
Questions and answers:
${answers.map((a, i) => `Q${i + 1}: ${a.question}\nA: ${a.answer}`).join("\n\n")}

Please provide structured JSON with:
- Scores (0-10) for: Technical Knowledge, Problem Solving, Communication, Behavior
- Short feedback (2-3 lines) for each category
- Overall recommendation: "Hire", "Maybe", or "No Hire"
`;

            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "x-ai/grok-4-fast:free",
                    messages: [{ role: "user", content: prompt }],
                    temperature: 0.3,
                }),
            });

            const data = await response.json();
            const analysis = data.choices[0].message.content;
            res.status(200).json({ analysis });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to analyze answers" });
        }
    }
}
