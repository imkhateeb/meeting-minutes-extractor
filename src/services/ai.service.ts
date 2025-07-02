import { createOpenAI } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { minutesOfMeetingsResponseSchema } from '../schema';
import dotenv from 'dotenv';
dotenv.config();

const openaiApiKey = process.env.OPENAI_API_KEY;
if (!openaiApiKey) {
  console.error('[ERROR] Missing OPENAI_API_KEY');
  process.exit(1);
}

const openai = createOpenAI({
  apiKey: openaiApiKey,
  compatibility: 'strict',
});

export async function processMeetingWithAI(text: string) {
  console.log('[INFO] Sending text to OpenAI, length:', text.length);

  const prompt = `
You are an AI assistant that extracts structured data from meeting notes.
Return JSON matching this schema:
- summary: concise summary
- decisions: list of key decisions
- actionItems: list of { task, optional owner, optional due }

If no data, return empty summary & lists.

Meeting text:
"""
${text}
"""
  `;

  try {
    const response = await Promise.race([
      generateObject({
        model: openai('gpt-4o'),
        schemaName: 'MinutesOfMeetingsResponse',
        schemaDescription: 'Structured meeting summary and action items',
        schema: minutesOfMeetingsResponseSchema,
        prompt,
      }),
      new Promise((_, reject) => setTimeout(() => reject(new Error('AI request timed out')), 10000))
    ]);

    console.log('[INFO] AI response received:', JSON.stringify((response as any).object, null, 2));
    return (response as any).object;
  } catch (error) {
    console.error('[ERROR] AI request failed:', error);
    return null;
  }
}
