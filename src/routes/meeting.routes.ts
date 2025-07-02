import express from 'express';
import { Request, Response } from 'express';
import multer from 'multer';
import fs from 'fs';
import { processMeetingNotes } from '../controllers/meeting.controller';

const meetingRouter = express.Router();
const upload = multer({ dest: 'uploads/' });

meetingRouter.post('/process', upload.single('file'), async (req: Request, res: Response) => {
    try {
        if (req.file) {
            const text = fs.readFileSync(req.file.path, 'utf-8');
            (req.body as any).text = text;
            fs.unlinkSync(req.file.path);
        }
        await processMeetingNotes(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export { meetingRouter };