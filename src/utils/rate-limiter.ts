import { Request, Response, NextFunction } from "express";
import { APIResponse } from "../types";

const requestMap: Map<string, number[]> = new Map();

// Max 5 requests per 60 seconds per IP
const RATE_LIMIT = 5;
const WINDOW_MS = 60 * 1000;

export function rateLimiter(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip;
    const now = Date.now();

    if (ip) {
        const timestamps = requestMap.get(ip) || [];
        const recentTimestamps = timestamps.filter((ts) => now - ts < WINDOW_MS);

        console.log(`[INFO] Rate limiter check for IP: ${ip}, recent requests: ${recentTimestamps.length}`);

        if (recentTimestamps.length >= RATE_LIMIT) {
            console.warn(`[WARN] Rate limit exceeded for IP: ${ip}`);
            res.status(429).json({
                status: "failure",
                data: null,
                msg: "Too many requests",
                error: "Too many requests. Please try again later."
            } as APIResponse);
        } else {
            recentTimestamps.push(now);
            requestMap.set(ip, recentTimestamps);
            console.log(`[INFO] Allowed request for IP: ${ip}, total in window: ${recentTimestamps.length}`);
        }
    } else {
        console.warn('[WARN] Could not determine IP address for rate limiting.');
    }

    next();
}
