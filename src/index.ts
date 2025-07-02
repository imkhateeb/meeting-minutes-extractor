import express from 'express';
import dotenv from 'dotenv';
import { rateLimiter } from './utils/rate-limiter';
import { apiRouter } from './routes';
import APP_CONFIG from './config';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => {
  res.send('OK');
});

app.use('/api', rateLimiter, apiRouter);

const PORT: number = APP_CONFIG.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
