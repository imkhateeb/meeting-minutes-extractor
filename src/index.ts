import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { rateLimiter } from './utils/rate-limiter';
import { apiRouter } from './routes';

dotenv.config();

const app = express();
app.use(express.json());

// Health check route
app.get('/health', rateLimiter, (_req, res) => {
  res.send('OK');
});

// API routes
app.use('/api', rateLimiter, apiRouter);

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[ERROR] Global error handler:', err);

  res.status(500).json({
    status: 'failure',
    msg: 'Internal server error',
    error: err.message || 'Something went wrong',
    data: null,
  });
});

const PORT: number = parseInt(process.env.PORT ?? '5000');
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
