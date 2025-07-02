import { Request, Response, NextFunction } from "express";

const requestMap: Map<string, number[]> = new Map();

const RATE_LIMIT = 5;
const WINDOW_MS = 60 * 1000;

export function rateLimiter(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip;
    const now = Date.now();

    if (ip) {
        const timestamps = requestMap.get(ip) || [];

        const recentTimestamps = timestamps.filter((ts) => now - ts < WINDOW_MS);

        if (recentTimestamps.length >= RATE_LIMIT) {
            res
                .status(429)
                .json({ 
                    success: "failure", 
                    data: null, 
                    msg: "Too many requests", 
                    error: "Too many requests. Please try again later." 
                });
        }else{
            recentTimestamps.push(now);
            requestMap.set(ip, recentTimestamps);
        }
    }

    next();
}
