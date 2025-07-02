import { z } from "zod";
import { minutesOfMeetingsResponseSchema } from "../schema";

export type MinutesOfMeetingsResponse = z.infer<typeof minutesOfMeetingsResponseSchema>;

export type AppConfigType = {
    OPENAI_API_KEY: string,
    PORT: number
}