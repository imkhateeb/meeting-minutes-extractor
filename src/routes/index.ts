import express from 'express';
import { meetingRouter } from './meeting.routes';
const apiRouter = express.Router();

apiRouter.use('/meeting', meetingRouter);

export { apiRouter };