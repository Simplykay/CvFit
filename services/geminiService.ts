import { GoogleGenAI, Type } from "@google/genai";
import { MatchResult } from "../types";

// Helper to sanitize and parse JSON safely
const parseJSON = (text: string): MatchResult => {
  try {
    // Attempt clean parse first
    return JSON.parse(text);
  } catch (e) {
    // If markdown fencing is present, strip it
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch && jsonMatch[1]) {
      return JSON.parse(jsonMatch[1]);
    }
    // Try checking for simple object start/end
    const objectMatch = text.match(/\{[\s\S]*\}/);
    if (objectMatch) {
      return JSON.parse(objectMatch[0]);
    }
    throw new Error("Failed to parse JSON response from Gemini");
  }
};

export const analyzeResume = async (resumeText: string, jdText: string): Promise<MatchResult> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please set the API_KEY environment variable.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    You are MatchlyPro, an expert ATS (Applicant Tracking System) simulator and CV Optimization Engine.
    Your goal is to analyze a Candidate's Resume against a Job Description (JD).
    
    PERFORM THE FOLLOWING:
    1. Calculate a Match Score (0-100) based on skills, experience, and seniority alignment.
    2. Identify specific Missing Keywords (Hard skills, Soft skills, Industry jargon).
    3. Perform Content Optimization: specific bullet points from the resume that are weak and rewrite them using the "X-Y-Z Formula" (Accomplished [X] as measured by [Y], by doing [Z]). Provide the reasoning.
    4. Run an ATS Compatibility Check: List specific formatting or phrasing issues that might flag the resume in a bad way.
    5. Provide a brief 1-2 sentence high-level summary.

    OUTPUT FORMAT:
    Return strictly JSON matching the specified schema. Do not include markdown if possible, just the JSON.
  `;

  const prompt = `
    JOB DESCRIPTION:
    ${jdText}

    RESUME CONTENT:
    ${resumeText}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                matchScore: { type: Type.NUMBER, description: "0 to 100 integer score" },
                missingKeywords: { 
                    type: Type.ARRAY, 
                    items: { type: Type.STRING },
                    description: "List of missing critical keywords"
                },
                contentOptimization: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            original: { type: Type.STRING },
                            improved: { type: Type.STRING, description: "Rewritten using X-Y-Z formula" },
                            reasoning: { type: Type.STRING }
                        }
                    },
                    description: "List of 3-5 key bullet point improvements"
                },
                atsCompatibilityCheck: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "List of ATS formatting or content warnings"
                },
                summary: { type: Type.STRING }
            },
            required: ["matchScore", "missingKeywords", "contentOptimization", "atsCompatibilityCheck", "summary"]
        }
      }
    });

    const text = response.text;
    if (!text) {
        throw new Error("Empty response from AI");
    }
    
    return parseJSON(text);

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};