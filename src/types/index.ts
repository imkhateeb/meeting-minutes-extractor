import { z } from "zod";
import { minutesOfMeetingsResponseSchema } from "../schema";

export type MinutesOfMeetingsResponse = z.infer<typeof minutesOfMeetingsResponseSchema>;