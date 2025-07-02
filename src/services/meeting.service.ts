import { processMeetingWithAI } from './ai.service';
import { MinutesOfMeetingsResponse } from '../types';

export async function extractMinutesOfMeeting(text: string): Promise<MinutesOfMeetingsResponse | null> {
  if (!text || text.trim().length < 10) {
    console.warn('[WARN] Invalid or empty meeting text.');
    return null;
  }

  return await processMeetingWithAI(text);
}
