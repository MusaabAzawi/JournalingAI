// src/routes/api/journal/+server.js
import { GoogleGenAI } from "@google/genai";
import { json } from '@sveltejs/kit';
import { API_KEY } from '$env/static/private';

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function POST({ request }) {
    try {
        const { prompt, type, context } = await request.json();
        
        if (!prompt?.trim()) {
            return json({ error: 'Prompt is required' }, { status: 400 });
        }

        let systemPrompt = '';
        
        if (type === 'new_entry') {
            systemPrompt = `You are a supportive AI journaling companion. The user has shared: "${prompt}"

Please respond with:
1. A warm, empathetic acknowledgment of their thoughts/feelings
2. A thoughtful question or reflection to help them explore deeper
3. Keep it conversational, supportive, and around 2-3 sentences

Be genuine, not overly cheerful, and match their emotional tone.`;
        } else {
            systemPrompt = `You are a helpful journaling assistant. Based on the conversation context, provide a supportive and thoughtful response. Previous context: ${context || 'None'}

User message: ${prompt}

Respond naturally and helpfully.`;
        }

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: systemPrompt,
          
        });

        return json(response);
        
    } catch (error) {
        console.error('API Error:', error);
        
        // Return a fallback response instead of failing completely
        const fallbackResponse = {
            candidates: [{
                content: {
                    parts: [{
                        text: "I hear you, and I appreciate you sharing your thoughts with me. Sometimes it helps just to put our feelings into words. What would you like to explore about this further?"
                    }]
                }
            }]
        };
        
        return json(fallbackResponse);
    }
}