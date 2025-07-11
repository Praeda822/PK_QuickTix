'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/actions/auth.actions';
import { toast } from 'sonner';

const LogoutButton = () => {
  const router = useRouter();

  const initialState = { success: false, message: '' };

  const [state, formAction] = useActionState(logoutUser, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success('Successfully logged out');
      router.push('/login');
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <form action={formAction}>
      <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
        Logout
      </button>
    </form>
  );
};

export default LogoutButton;
