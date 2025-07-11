'use server';

import { prisma } from '@/db/prisma';
import bcrypt from 'bcryptjs';
import { logEvent } from '@/utils/sentry';
import { signAuthToken, setAuthCookie } from '@/lib/auth';

type ResponseResult = {
  success: boolean;
  message: string;
};

// Register a new user
export async function registerUser(
  prevState: ResponseResult,
  formData: FormData
): Promise<ResponseResult> {
  try {
    const name = (formData.get('name') as string)?.trim();
    const email = (formData.get('email') as string)?.trim().toLowerCase();
    const password = (formData.get('password') as string)?.trim();

    if (!name || !email || !password) {
      logEvent('Validation error: missing registration fields', 'auth', { name, email }, 'warning');
      return { success: false, message: 'All fields are required.' };
    }

    // Minimum password length check
    if (password.length < 7) {
      logEvent('Validation error: Password is less than 7 characters', 'auth', {}, 'warning');
      return { success: false, message: 'Password must be at least 7 characters.' };
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      logEvent(`Registration failed: User already exists - ${email}`, 'auth', { email }, 'warning');
      return { success: false, message: 'User already exists.' };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    // TO-DO: Potential for race condition here, will refactor later..
    //
    //
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Sign and set auth token
    const token = await signAuthToken({ userId: user.id });
    await setAuthCookie(token);

    logEvent(`User registered successfully - ${email}`, 'auth', { userId: user.id, email }, 'info');
    return { success: true, message: 'User registered successfully.' };
  } catch (error) {
    logEvent('Error during user registration', 'auth', {}, 'error', error);
    return { success: false, message: 'Something went wrong, please try again' };
  }
}
