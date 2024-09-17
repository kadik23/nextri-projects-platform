/** Length of authentication tokens in characters */
export const AUTH_TOKEN_LENGTH = 32;
/** Lifespan of short-lived authentication tokens */
export const SHORT_LIVED_AUTH_TOKEN_DURATION = 1000 * 60 * 5; // 5 min
/** Lifespan of email verification links */
export const EMAIL_VERIFICATION_LINK_DURATION = 1000 * 60 * 60 * 24 * 7; // 7 days
/** URL for redirect after successful authentication */
export const AUTH_REDIRECT_URL = process.env.AUTH_REDIRECT_URL || "/dashboard";
