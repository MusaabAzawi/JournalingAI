import { GoogleGenAI } from "@google/genai";
import { json } from '@sveltejs/kit';
import { API_KEY } from '$env/static/private';

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function GET() {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: "Getting started with Journaling - respond with a short, encouraging message about journaling",
        });
        
        return json(response);
    } catch (error) {
        console.error('API Error:', error);
        return json({ error: 'Failed to connect to AI service' }, { status: 500 });
    }
}