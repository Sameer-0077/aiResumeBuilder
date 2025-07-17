const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateResume = async (req, res) => {
  const userId = req.user?.id;
  const userDetails = req.body;

  if (!userDetails || Object.keys(userDetails).length === 0) {
    return res.status(400).json({ error: "User details are required" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const instruction = `
You are an expert resume writer AI assistant.

Your task is to generate a professional, clean, ATS-friendly resume **in JSON format** based on the user's details. Follow the format given below, and enhance fields intelligently as needed.

**Guidelines**:
- If a field like **summary** or **responsibilities** is missing or too brief, **generate a clear, 2–4 line version** based on the user's other inputs (like experience, education, skills).
- If the user provides good content, use it directly.
- If the input is vague (e.g., responsibility: "worked in frontend"), rewrite it as a strong, action-oriented statement (e.g., "Developed responsive user interfaces using React and Tailwind CSS").
- Do not include conversational text, headers, or markdown (no \`\`\`json).
- Use professional, clean, concise language suitable for job applications.
- If you need to infer anything (like location or skills), do so reasonably from the context.

**JSON format to follow**:
{
  "personal_info": {
    "name": "string",
    "email": "string",
    "phone": "string",
    "linkedin": "string",
    "portfolio": "string",
    "location": "string"
  },
  "summary": "2–4 line summary (auto-generate if empty or vague)",
  "experiences": [
    {
      "title": "string",
      "company": "string",
      "location": "string",
      "start_date": "string",
      "end_date": "string",
      "responsibilities ": ["enhanced list of strings based on input or generated if missing"]
    }
  ],
  "education": [
    {
      "degree": "string",
      "major": "string",
      "university": "string",
      "location": "string",
      "start_year": "string",
      "end_year": "string",
      "gpa": "string"
    }
  ],
  "skills": {
    "technical": ["string"],
    "soft": ["string"],
    "languages": ["string"]
  },
  "projects": [
    {
      "name": "string",
      "description": "enhanced or rewritten if vague",
      "technologies": ["string"],
      "link": "string"
    }
  ],
  "certifications": [
    {
      "name": "string",
      "issuing_organization": "string",
      "date": "string",
      "link": "string"
    }
  ]
}

Here are the user's raw details to base your output on:
Name: ${userDetails.personal_info?.name || ""}
Email: ${userDetails.personal_info?.email || ""}
Phone: ${userDetails.personal_info?.phone || ""}
LinkedIn: ${userDetails.personal_info?.linkedin || ""}
Portfolio: ${userDetails.personal_info?.portfolio || ""}
Location: ${userDetails.personal_info?.location || ""}

Summary/Objective: ${userDetails.summary || ""}

Work Experience:
${(userDetails.experiences || [])
  .map(
    (exp) => `
- Title: ${exp.title || ""}
  Company: ${exp.company || ""}
  Location: ${exp.location || ""}
  Dates: ${exp.start_date || ""} - ${exp.end_date || ""}
  Responsibilities:
  ${exp.responsibilities?.map((r) => `- ${r}`).join("\n  ") || ""}
`
  )
  .join("\n")}

Education:
${(userDetails.education || [])
  .map(
    (edu) => `
- Degree: ${edu.degree || ""}
  Major: ${edu.major || ""}
  University: ${edu.university || ""}
  Location: ${edu.location || ""}
  Dates: ${edu.start_year || ""} - ${edu.end_year || ""}
  GPA: ${edu.gpa || ""}
`
  )
  .join("\n")}

Skills:
  Technical: ${userDetails.skills?.technical?.join(", ") || ""}
  Soft: ${userDetails.skills?.soft?.join(", ") || ""}
  Languages: ${userDetails.skills?.languages?.join(", ") || ""}

Projects:
${(userDetails.projects || [])
  .map(
    (proj) => `
- Name: ${proj.name || ""}
  Description: ${proj.description || ""}
  Technologies: ${proj.technologies?.join(", ") || ""}
  Link: ${proj.link || ""}
`
  )
  .join("\n")}

Certifications:
${(userDetails.certifications || [])
  .map(
    (cert) => `
- Name: ${cert.name || ""}
  Issuing Organization: ${cert.issuing_organization || ""}
  Date: ${cert.month + "  " + cert.year || ""}
  Link: ${cert.link || ""}
`
  )
  .join("\n")}
`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: instruction }] }],
      generationConfig: {
        temperature: 0.7,
      },
    });

    const rawText = result.response.text();
    let generatedResumeJson;

    try {
      // Try direct JSON parsing first
      generatedResumeJson = JSON.parse(rawText);
    } catch (err) {
      // Fallback: extract from ```json ... ``` block
      const match = rawText.match(/```json\s*([\s\S]*?)```/);
      if (match && match[1]) {
        try {
          generatedResumeJson = JSON.parse(match[1].trim());
        } catch (innerErr) {
          console.error("Failed to parse JSON from markdown:", innerErr);
          return res.status(500).json({
            message: "AI returned invalid JSON inside markdown block.",
          });
        }
      } else {
        console.error("AI returned unrecognizable format:", rawText);
        return res
          .status(500)
          .json({ message: "AI did not return valid JSON." });
      }
    }

    res.status(200).json(generatedResumeJson);
  } catch (error) {
    console.error("Gemini API error:", error);
    res
      .status(500)
      .json({ message: "Failed to generate resume", error: error.message });
  }
};

module.exports = { generateResume };
