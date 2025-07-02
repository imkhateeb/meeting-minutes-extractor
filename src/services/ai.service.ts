import { createOpenAI } from '@ai-sdk/openai';
import { MinutesOfMeetingsResponse } from '../types';
import { generateObject } from 'ai';
import { minutesOfMeetingsResponseSchema } from '../schema';

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  compatibility: 'strict',
});

export async function processMeetingWithAI(
  text: string
): Promise<{ success: boolean; data?: MinutesOfMeetingsResponse; error?: string }> {
  try {
    console.log('[INFO] Processing raw meeting data...');

    const prompt = `
You are an AI assistant that extracts structured data from meeting notes.
Analyze the raw meeting text and return a JSON object following this schema:
- summary: concise 2–3 sentence summary
- decisions: key decisions as a list of strings
- actionItems: list of objects with task (required), owner (optional), and due (optional)

If no useful data is found, return an empty summary and empty lists.

Raw meeting text:
"""
${text}
"""
`;

    const response = await generateObject({
        model: openai('gpt-4o'),
        schemaName: 'MinutesOfMeetingsResponse',
        schemaDescription: 'Structured summary, decisions and action items from meeting notes',
        schema: minutesOfMeetingsResponseSchema,
        prompt,
    });

    console.log('[INFO] AI structured response:', JSON.stringify(response.object, null, 2));

    return {
        success: true,
        data: response.object,
    };
  } catch (error: unknown) {
    console.error('[ERROR] Failed to process meeting notes:', error);
    return {
        success: false,
        error: 'Unable to process meeting data. Check server logs for details.',
    };
  }
}
