import { z } from "zod";
import { minutesOfMeetingsResponseSchema } from "../schema";

export type ProcessMeetingResponse = z.infer<typeof minutesOfMeetingsResponseSchema>