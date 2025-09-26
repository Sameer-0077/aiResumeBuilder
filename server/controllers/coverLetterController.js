const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: API_KEY });

// Define the JSON schema for robust structured output
const coverLetterSchema = {
  type: "object",
  properties: {
    yourName: { type: "string" },
    yourEmail: { type: "string" },
    yourAddress: { type: "string" },
    yourPhoneNumber: { type: "string" },
    jobTitle: { type: "string" },
    hiringManager: { type: "string" },
    companyName: { type: "string" },
    companyAddress: { type: "string" },
    greetings: {
      type: "string",
      description: "Dear [Hiring Manager], format.",
    },
    openingParagraph: { type: "string" },
    bodyParagraph1: { type: "string" },
    bodyParagraph2: { type: "string" },
    closingParagraph: { type: "string" },
  },
  required: [
    "yourName",
    "yourEmail",
    "jobTitle",
    "hiringManager",
    "companyName",
    "greetings",
    "openingParagraph",
    "bodyParagraph1",
    "bodyParagraph2",
    "closingParagraph",
  ],
};

const generateCoverLetter = async (req, res) => {
  const userDetails = req.body;

  try {
    const instruction = `
            You are an expert cover letter writer AI assistant.

            Your task is to generate a personalized, formal, and confident cover letter for a job application **in JSON format** based on the user's details.

            **Guidelines**:

            - **greetings**: Greet the hiring manager by name. Use "Dear [Hiring Manager]," format.
            
            - **openingParagraph**: Express interest in the job. Mention the job title and company name. Reflect enthusiasm based on the provided jobDescription and whyInterested. Do not include placeholder text like “[platform where job was seen]”.
            
            - **bodyParagraph1**: Describe the applicant’s work experience, tools, and technologies they have used — based on yourExperience and keySkills. Highlight specific types of work or roles they've handled.
            
            - **bodyParagraph2**: Explain why the applicant is a good fit for the role based on their keyAchievements and whyInterested. This should show alignment between the applicant’s past contributions and the company’s goals or values.
            
            - **closingParagraph**: Politely express gratitude for consideration, express willingness to discuss further, and encourage contact for an interview.

            - **CRITICAL**: Do not include conversational text, headers, or markdown (no \`\`\`json). The output must be ONLY the raw JSON object.
            
            - Use professional, clean, concise language suitable for job applications.
            - If a field is missing or empty, do NOT include placeholder text like “[insert here]”. Instead, rephrase the sentence or skip the mention entirely.
            - If no specific company values are provided, you may add general positive values that apply to most modern companies (e.g., innovation, product quality, user experience).
            - Always use professional tone and real-world phrasing.
            - Ensure the cover letter still flows naturally even when some data is missing.

            Here are the user's raw details to base your output on:

            - Job Title: ${userDetails?.jobTitle || ""}
            - Company Name: ${userDetails?.companyName || ""}
            - Company Address: ${userDetails?.companyAddress || ""}
            - Hiring Manager: ${userDetails?.hiringManager || ""}
            - Applicant Name: ${userDetails?.yourName || ""}
            - Applicant Email: ${userDetails?.yourEmail || ""}
            - Applicant Address: ${userDetails?.yourAddress || ""}
            - Applicant Phone Number: ${userDetails?.yourPhoneNumber || ""}
            - Job Description: ${userDetails?.jobDescription || ""}
            - Applicant Experience Summary: ${userDetails?.yourExperience || ""}
            - Why Interested in the Role: ${userDetails?.whyInterested || ""}
            - Key Skills: ${userDetails?.keySkills || ""}
            - Key Achievements: ${userDetails?.keyAchievements || ""}
        `;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: instruction }] }],
      config: {
        temperature: 0.7,
        // ** CRITICAL: Enable Structured Output for reliable JSON **
        responseMimeType: "application/json",
        responseSchema: coverLetterSchema,
      },
    });

    // ** CORRECT USAGE: The generated text is on the .text property **
    // This is the main fix for the @google/genai SDK
    const rawText = result.text;

    // Since we used responseMimeType: "application/json", the rawText
    // should be a valid JSON string, eliminating the need for complex parsing.

    let generatedCoverLetter;

    try {
      generatedCoverLetter = JSON.parse(rawText);
    } catch (error) {
      console.error("Failed to parse JSON from AI response:", error);
      // Log the problematic raw text for debugging
      console.error("Raw AI Text:", rawText);
      return res.status(500).json({
        message: "AI returned invalid JSON despite structured output request.",
      });
    }

    res.status(200).json(generatedCoverLetter);
  } catch (error) {
    console.error("Gemini API error: ", error);
    res.status(500).json({
      message: "Failed to generate cover letter due to API error",
      error: error.message,
    });
  }
};

module.exports = { generateCoverLetter };
