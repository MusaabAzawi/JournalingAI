import { GoogleGenAI } from "@google/genai";
import { json } from '@sveltejs/kit';
import { API_KEY } from '$env/static/private';

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function POST({ request }) {
    try {
        const { prompt, journalId, context } = await request.json();
        
        if (!prompt || typeof prompt !== 'string') {
            return json({ error: 'Prompt is required' }, { status: 400 });
        }

        // Build the conversation context for the AI
        let conversationContext = "You are a thoughtful journaling assistant. Help the user explore their thoughts and feelings through gentle questions and supportive responses. Keep responses conversational and encouraging.";
        
        if (context && context.length > 0) {
            // Add previous conversation context
            conversationContext += "\n\nPrevious conversation:\n";
            context.forEach(msg => {
                if (msg.role === 'user') {
                    conversationContext += `User: ${msg.content}\n`;
                } else if (msg.role === 'ai') {
                    conversationContext += `Assistant: ${msg.content}\n`;
                }
            });
        }
        
        conversationContext += `\nUser: ${prompt}\nAssistant:`;

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: conversationContext,
        });

        return json(response);
    } catch (error) {
        console.error('Error in journal API:', error);
        
        // Return a fallback response for better user experience
        const fallbackResponse = {
            candidates: [{
                content: {
                    parts: [{
                        text: "Thank you for sharing your thoughts. I'm here to listen and help you explore your feelings. What else would you like to talk about today?"
                    }]
                }
            }]
        };
        
        return json(fallbackResponse);
    }
}