import { z } from "zod";
import { minutesOfMeetingsResponseSchema } from "../schema";

export type MinutesOfMeetingsResponse = z.infer<typeof minutesOfMeetingsResponseSchema>;

export type AppConfigType = {
    OPENAI_API_KEY: string,
    PORT: number
}

export interface APIResponse<T = any> {
    status: "success" | "failure";
    msg: string;
    data: T | null;
    error: string | null;
}