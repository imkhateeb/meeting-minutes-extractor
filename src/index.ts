import express from 'express';
import dotenv from 'dotenv';
import { rateLimiter } from './utils/rate-limiter';
import { apiRouter } from './routes';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/health', rateLimiter, (_req, res) => {
  res.send('OK');
});

app.use('/api', rateLimiter, apiRouter);

const PORT: number = parseInt(process.env.PORT ?? "5000");
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
