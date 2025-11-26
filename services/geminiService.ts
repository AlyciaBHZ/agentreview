import { GoogleGenAI } from "@google/genai";
import { Paper } from "../types";

// In a real app, this key comes from process.env.API_KEY
// For this MVP demo, we assume the environment is set up.
const API_KEY = process.env.API_KEY || ''; 

export const GeminiService = {
  analyzePaper: async (paper: Paper): Promise<string> => {
    if (!API_KEY) {
      console.warn("No Gemini API Key found.");
      return "AgentReview AI Node: Please configure your API Key to enable neural analysis.";
    }

    try {
      const ai = new GoogleGenAI({ apiKey: API_KEY });
      
      const prompt = `
        You are an expert academic reviewer for AI Agents. 
        Analyze the following abstract for a paper titled "${paper.title}".
        
        Abstract: "${paper.abstract}"

        Provide a structured "DeSci Review" in markdown format:
        1. **Core Innovation**: One sentence on what is new.
        2. **Agentic Capability**: Does it involve multi-agent consensus, tool use, or embodiment?
        3. **Impact Rating**: A score from 1-10 on potential impact for the AI ecosystem.
        4. **Critique**: One potential limitation.
        
        Keep it concise (under 150 words). Tone: Cyberpunk academic, objective but forward-looking.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      return response.text || "Analysis failed.";
    } catch (error) {
      console.error("Gemini Analysis Error:", error);
      return "System Error: Neural link to Gemini interrupted. Please try again later.";
    }
  }
};
