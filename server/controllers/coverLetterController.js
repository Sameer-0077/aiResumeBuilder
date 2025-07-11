const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateCoverLetter = async (req, res) => {
  const userDetails = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const instruction = `
         You are an expert cover letter writer AI assistant.

         Your task is to generate a personalized, formal, and confident cover letter for a job application **in JSON format** based on the user's details. Follow the format given below, and enhance fields intelligently as needed.

         **Guidelines**:

         - **greetings**: Greet the hiring manager by name. Use "Dear [Hiring Manager]," format.
   
         - **openingParagraph**: Express interest in the job. Mention the job title and company name. Reflect enthusiasm based on the provided jobDescription and whyInterested and most important do not include placeholder text like “[platform where job was seen]”.
         
         - **bodyParagraph1**: Describe the applicant’s work experience, tools, and technologies they have used — based on yourExperience and keySkills. Highlight specific types of work or roles they've handled.
         
         - **bodyParagraph2**: Explain why the applicant is a good fit for the role based on their keyAchievements and whyInterested. This should show alignment between the applicant’s past contributions and the company’s goals or values.
         
         - **closingParagraph**: Politely express gratitude for consideration, express willingness to discuss further, and encourage contact for an interview.

         - Do not include conversational text, headers, or markdown (no \`\`\`json).

         - Use professional, clean, concise language suitable for job applications.
         - If a field is missing or empty, do NOT include placeholder text like “[insert here]” or “[platform where job was seen]”. Instead, rephrase the sentence or skip the mention entirely.
         - If no job posting source is given, remove the sentence mentioning where the job was seen.
         - If no specific company values are provided, you may add general positive values that apply to most modern companies (e.g., innovation, product quality, user experience).
         - Always use professional tone and real-world phrasing.
         - Ensure the cover letter still flows naturally even when some data is missing.

         **JSON format to follow**:
         {
            "yourName": "string",
            "yourEmail": "string",
            "yourAddress": "string",
            "yourPhoneNumber": "string",
            "jobTitle": "string",
            "hiringManager": "string",
            "companyName": "string",
            "companyAddress": "string",
            "greetings": "string",
            "openingParagraph": "string",
            "bodyParagraph1": "string",
            "bodyParagraph2": "string",
            "closingParagraph": "string",
         }

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

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: instruction }] }],
      generationConfig: {
        temperature: 0.7,
      },
    });

    const rawText = result.response.text();
    let generatedCoverLetter;

    try {
      // Try direct JSON parsing first
      generatedCoverLetter = JSON.parse(rawText);
    } catch (error) {
      // Fallback: extract from ```json ... ``` block
      const match = rawText.match(/```json\s*([\s\S]*?)```/);
      if (match && match[1]) {
        try {
          generatedCoverLetter = JSON.parse(match[1].trim());
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

    res.status(200).json(generatedCoverLetter);
  } catch (error) {
    console.error("Gemini API error: ", error);
    res.status(500).json({
      message: "Failed to generate cover letter",
      error: error.message,
    });
  }
};

module.exports = { generateCoverLetter };
