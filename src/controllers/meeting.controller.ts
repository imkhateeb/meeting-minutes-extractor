import { Request, Response } from 'express';
import { processMeetingWithAI } from '../services/ai.service';

export async function processMeetingNotes(req: Request, res: Response) {
  try {
    const { text } = req.body;
    const result = await processMeetingWithAI(text);

    if(result){
      res.status(200).json({
        status: "success",
        msg: "Meeting notes processed successfully",
        data: result,
        error: null
      });
    }else{
      res.status(404).json({
        status: "failure",
        msg: "Processed data not found!",
        data: result,
        error: "Processed data not found!, Try again after sometime",
      });
    }
    
  } catch (error: any) {
    res.status(500).json({ 
        status: "failure", 
        error: error.message || 'Internal server error', 
        data: null, 
        msg: "Internal server error"
    });
  }
}
