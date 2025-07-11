import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { logEvent } from '../utils/sentry';

const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
const cookieName = 'auth-token';

// Encrypt & sign JWT
export async function signAuthToken(payload: Record<string, unknown>) {
  try {
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(secret);

    return token;
  } catch (error) {
    logEvent('Auth token signing error', 'auth', { payload }, 'error', error);
    throw new Error('Auth token signing failed');
  }
}

// Decrypt and Verify token
export async function verifyAuthToken<T>(token: string): Promise<T> {
  try {
    const { payload } = await jwtVerify(token, secret);

    return payload as T;
  } catch (error) {
    logEvent(
      'Auth token decryption failed',
      'auth',
      { tokenSnippet: token.slice(0, 10) },
      'error',
      error
    );
    throw new Error('Token decryption failed');
  }
}

// Set auth cookie
export async function setAuthCookie(token: string) {
  try {
    const cookieStore = await cookies();
    cookieStore.set(cookieName, token, {
      httpOnly: true, // Prevents Javascript from accessing the cookie
      sameSite: 'lax', // Can only be set from top-level GET requests from other sites
      secure: process.env.NODE_ENV === 'production', // Can only be used with HTTPS in PRODUCTION
      path: '/', // Cookie is available site-wide
      maxAge: 60 * 60 * 24 * 7, // Max expiry date - 7 days
    });
  } catch (error) {
    logEvent('Failed to set cookie', 'auth', { token }, 'error', error);
  }
}

// Get auth token from cookie
export async function getAuthCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieName);
  return token?.value;
}

// Remove auth token cookie
export async function removeAuthCookie() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(cookieName);
  } catch (error) {
    logEvent('Failed to remove auth cookie', 'auth', {}, 'error', error);
  }
}
