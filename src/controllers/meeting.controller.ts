import { Request, Response } from 'express';
import { extractMinutesOfMeeting } from '../services/meeting.service';
import { APIResponse } from '../types';

export async function processMeetingNotes(req: Request, res: Response) {
  const text = req.body.text;

  if (!text || typeof text !== 'string') {
    console.warn('[WARN] Missing text input in request.');
    return res.status(400).json({
      status: 'failure',
      msg: 'Missing or invalid text input',
      data: null,
      error: 'Text input is required'
    } as APIResponse);
  }

  console.log('[INFO] Processing meeting text...');
  const data = await extractMinutesOfMeeting(text);

  if (data) {
    return res.status(200).json({
      status: 'success',
      msg: 'Meeting notes processed successfully',
      data,
      error: null
    } as APIResponse);
  } else {
    return res.status(500).json({
      status: 'failure',
      msg: 'Failed to process meeting notes',
      data: null,
      error: 'AI processing failed or returned no data'
    } as APIResponse);
  }
}
