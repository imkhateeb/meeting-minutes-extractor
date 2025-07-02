import express, { Request, Response } from 'express';
import multer from 'multer';
import fs from 'fs';
import { processMeetingNotes } from '../controllers/meeting.controller';

const meetingRouter = express.Router();
const upload = multer({ dest: 'uploads/' });

meetingRouter.post('/process', upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (req.file) {
      console.log('[INFO] File uploaded:', req.file.originalname);
      const text = fs.readFileSync(req.file.path, 'utf-8');
      (req.body as any).text = text;
      fs.unlinkSync(req.file.path);
    } else {
      console.log('[INFO] No file uploaded, expecting raw text in body');
    }

    await processMeetingNotes(req, res);
  } catch (error) {
    console.error('[ERROR]', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export { meetingRouter };
