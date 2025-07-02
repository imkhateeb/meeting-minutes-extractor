import { createOpenAI } from '@ai-sdk/openai';
import { ProcessMeetingResponse } from '../types';
import { minutesOfMeetingsResponseSchema } from '../schema';
const { generateObject } = require("ai");

const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    compatibility: "strict",
});

export async function processMeetingWithAI(text: string): Promise<{success: boolean, data?: ProcessMeetingResponse, error?: string}> {
    try {
        console.log("[INFO] Raw Data Received:", text);

        const res = await generateObject({
        model: openai("gpt-4o", { structuredOutputs: false }),
        schemaName: "minutesOfMeetingsResponseSchema",
        schemaDescription: "Comprehensive schema for parsing minutes of meeting",
        schema: minutesOfMeetingsResponseSchema,
        prompt: `
            You are an assistant that extracts structured meeting summary, decisions and action items. 
            Convert the input data into structured JSON using the provided schemas.

            Output:
            - Return an error message if no valid data is found.

            Input Raw Data: ${text}
        `,
        });

        console.log("[INFO] Response Received:", JSON.stringify(res, null, 2));
        return {
        success: true,
        data: JSON.parse(JSON.stringify(res.object, null, 2))
        }
    } catch (error: unknown) {
        return { 
        success: false,
        error: "Unable to process data. Check logs for details. " + JSON.stringify(error)
        };
    }
};
