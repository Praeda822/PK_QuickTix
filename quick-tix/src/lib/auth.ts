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
