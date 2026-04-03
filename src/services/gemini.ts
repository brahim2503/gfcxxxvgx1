import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function askMamaCareAI(prompt: string, pregnancyWeek?: number) {
  const systemInstruction = `You are MamaCare AI, a supportive and knowledgeable assistant for pregnant women. 
  Your tone is warm, reassuring, and professional. 
  Current pregnancy week: ${pregnancyWeek || 'unknown'}.
  Provide advice on health, nutrition, and what to expect. 
  Always advise consulting a doctor for medical emergencies.
  Respond in the language the user uses (Arabic, French, or English).`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction,
      },
    });
    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "I'm sorry, I'm having trouble connecting right now. Please try again later.";
  }
}
