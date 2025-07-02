import express from 'express';
import { meetingRouter } from './meeting.routes';
export const apiRouter = express.Router();

apiRouter.use('/meeting', meetingRouter);
