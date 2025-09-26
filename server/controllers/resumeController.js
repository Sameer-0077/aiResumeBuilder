const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: API_KEY });

// 1. Define the JSON schema for robust structured output
// (OpenAPI 3.0 subset)
const resumeSchema = {
  type: "object",
  properties: {
    personal_info: {
      type: "object",
      properties: {
        name: { type: "string" },
        email: { type: "string" },
        phone: { type: "string" },
        linkedin: { type: "string" },
        portfolio: { type: "string" },
        location: { type: "string" },
      },
      required: ["name", "email"],
    },
    summary: {
      type: "string",
      description: "A 2-4 line professional summary.",
    },
    experiences: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          company: { type: "string" },
          location: { type: "string" },
          start_date: { type: "string" },
          end_date: { type: "string" },
          responsibilities: {
            type: "array",
            items: { type: "string" },
            description: "List of enhanced, action-oriented bullet points.",
          },
        },
      },
    },
    education: {
      type: "array",
      items: {
        type: "object",
        properties: {
          degree: { type: "string" },
          major: { type: "string" },
          university: { type: "string" },
          location: { type: "string" },
          start_year: { type: "string" },
          end_year: { type: "string" },
          gpa: { type: "string" },
        },
      },
    },
    skills: {
      type: "object",
      properties: {
        technical: { type: "array", items: { type: "string" } },
        soft: { type: "array", items: { type: "string" } },
        languages: { type: "array", items: { type: "string" } },
      },
    },
    projects: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          description: {
            type: "string",
            description: "Enhanced project description.",
          },
          technologies: { type: "array", items: { type: "string" } },
          link: { type: "string" },
        },
      },
    },
    certifications: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          issuing_organization: { type: "string" },
          date: { type: "string" },
          link: { type: "string" },
        },
      },
    },
  },
  required: ["personal_info", "summary", "experiences", "education", "skills"],
};

const generateResume = async (req, res) => {
  const userId = req.user?.id;
  const userDetails = req.body;

  if (!userDetails || Object.keys(userDetails).length === 0) {
    return res.status(400).json({ error: "User details are required" });
  }

  try {
    // The instruction is cleaner and focuses only on content logic, as the
    // JSON structure is handled by the schema in the config.
    const instruction = `
You are an expert resume writer AI assistant.

Your task is to generate a professional, clean, ATS-friendly resume **strictly following the provided JSON schema** based on the user's raw details.

**Core Directives**:
- If a field like **summary** or **responsibilities** is missing or too brief, **generate a clear, 2–4 line version** based on the user's other inputs (like experience, education, skills).
- If the input is vague (e.g., responsibility: "worked in frontend"), rewrite it as a strong, action-oriented statement (e.g., "Developed responsive user interfaces using React and Tailwind CSS").
- **CRITICAL**: The output must be **ONLY the raw JSON object**. Do not include conversational text, headers, or markdown (no \`\`\`json).
- Use professional, clean, concise language suitable for job applications.
- Infer missing details (like location or relevant skills) reasonably from the context.

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
  Date: ${cert.month + " " + cert.year || ""}
  Link: ${cert.link || ""}
`
  )
  .join("\n")}
`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: instruction }] }],
      config: {
        temperature: 0.7,
        // ** CORRECT USAGE for Structured Output **
        responseMimeType: "application/json",
        responseSchema: resumeSchema,
      },
    });

    // ** CORRECT USAGE: Access the generated text directly from the result object **
    // The previous SDK used `result.response.text()`, the new SDK uses `result.text`.
    const rawText = result.text;
    let generatedResumeJson;

    try {
      // Because we used Structured Output, this should now be reliable
      generatedResumeJson = JSON.parse(rawText);
    } catch (error) {
      console.error("Failed to parse JSON from AI response:", error);
      console.error("Raw AI Text (Problematic):", rawText);

      // If the model fails to adhere to the schema, it's a 500 error
      // from our end since the API call succeeded but the output is unusable.
      return res.status(500).json({
        message:
          "AI returned invalid JSON despite structured output request. Check logs for raw text.",
      });
    }

    res.status(200).json(generatedResumeJson);
  } catch (error) {
    console.error("Gemini API error:", error);
    res
      .status(500)
      .json({
        message: "Failed to generate resume due to API error",
        error: error.message,
      });
  }
};

module.exports = { generateResume };
