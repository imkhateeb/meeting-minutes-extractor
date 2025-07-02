import { z } from 'zod';

/**
 * Represents a single action item from meeting notes,
 * which may optionally include the person responsible and the deadline.
 */
export const actionItemSchema = z.object({
  task: z
    .string()
    .describe('The actionable task identified in the meeting notes, e.g., "Prepare onboarding docs"'),
  owner: z
    .string()
    .optional()
    .describe('Person assigned to complete the task, if mentioned in the meeting'),
  due: z
    .string()
    .optional()
    .describe('Deadline for the task, e.g., "June 5"; can be a date or relative deadline'),
});

/**
 * Represents the structured summary of meeting notes,
 * including a summary, key decisions, and list of action items.
 */
export const minutesOfMeetingsResponseSchema = z.object({
  summary: z
    .string()
    .describe('A concise 2–3 sentence summary of the main points discussed in the meeting'),
  decisions: z
    .array(z.string())
    .describe('A list of key decisions made during the meeting'),
  actionItems: z
    .array(actionItemSchema)
    .describe('List of actionable items extracted from the meeting, each with task, optional owner, and optional due date'),
});