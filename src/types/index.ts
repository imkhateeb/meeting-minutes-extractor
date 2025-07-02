import { z } from "zod";
import { minutesOfMeetingsResponseSchema } from "../schema";

export type MinutesOfMeetingsResponse = z.infer<typeof minutesOfMeetingsResponseSchema>;

export type AppConfigType = {
    OPENAI_API_KEY: string,
    PORT: number
}

export type APIResponse = {
    status: "success" | "failure",
    msg: string,
    data: any,
    error: string | null
}