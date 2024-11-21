// frontend/src/middleware/rateLimiter.js

import rateLimit from 'express-rate-limit';

// Limit to 5 requests per hour per IP
export const resendVerificationLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // Limit each IP to 5 requests per windowMs
    message: {
        success: false,
        message: "Too many resend requests from this IP, please try again after an hour."
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
