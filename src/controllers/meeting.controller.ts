import { Request, Response } from 'express';
import { processMeetingWithAI } from '../services/ai.service';

export async function processMeetingNotes(req: Request, res: Response) {
  try {
    const { text } = req.body.text;
    const result = await processMeetingWithAI(text);
    res.status(200).json({
        status: "success",
        msg: "User registered successfully",
        data: result,
        error: null
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ 
        status: "failure", 
        error: error.message || 'Internal server error', 
        data: null, 
        msg: "Internal server error"
    });
  }
}
