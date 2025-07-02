import { z } from "zod";

const actionItemSchema = z.object({
    task: z.string().describe("Task discussed in the meeting"),
    owner: z.string().nullish().describe("Owner of the task"),
    due: z.string().nullish().describe("Task due date (e.g., 5th June 2025)")
}).describe("An action item");

export const minutesOfMeetingsResponseSchema = z.object({
    summary: z.string().describe("Summary of the meeting"),
    decisions: z.array(z.string().describe("Decision taken in the minutes of meeting")).nullish().describe("List of decisions taken in the meeting"),
    actionItems: z.array(actionItemSchema).describe("List of action items from the meeting")
});