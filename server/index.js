const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { OpenAI } = require("openai");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/generate-resume", async (req, res) => {
  const { name, education, experience, projects, skills, achievements } =
    req.body;
  try {
    const prompt = `
        Create a professional resume summary for the following:
        Name: ${name}
        Education: ${education}
        Experience: ${experience}
        Projects: ${projects}
        Skills: ${skills}
        Achievements: ${achievements}
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const aiResponse = completion.choices[0].message.content;
    res.json({ resume: aiResponse });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Something went wrong generating the resume." });
  }
});

app.get("/", (req, res) => {
  res.send("Hey there!");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
