import { GoogleGenAI } from "@google/genai";
// Access API_KEY from environment variables
import {API_KEY} from '$env/static/private';
const ai = new GoogleGenAI({ apiKey: API_KEY });
export async function GET() {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "Write a short review of W3Schools",
     
    });
    return new Response(JSON.stringify(response), {
      headers: {
        "Content-Type": "application/json"
      }
    });
}