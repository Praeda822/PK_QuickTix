import { verifyAuthToken, getAuthCookie } from './auth';
import { prisma } from '@/db/prisma';

type AuthPayload = {
  userId: string;
};

export async function getCurrentUser() {
  try {
    const token = await getAuthCookie();
    if (!token) return null;

    const payload = (await verifyAuthToken(token)) as AuthPayload;

    if (!payload?.userId) return null;

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return user;
  } catch (error) {
    console.log('Error fetching current user:', error);
    return null;
  }
}
