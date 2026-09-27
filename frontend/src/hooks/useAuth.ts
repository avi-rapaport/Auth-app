import { useMutation, useQuery } from '@tanstack/react-query';

export function useSignup() {
  return useMutation({
    mutationFn: async (userData: {
      userName: string;
      email: string;
      password: string;
    }) => {
      const res = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(userData),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      return result;
    },
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: async (userData: { userName: string; password: string }) => {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(userData),
      });

      const result = await res.json();
      if (res.ok) throw new Error(result.message);
      return result;
    },
  });
}

export function useMe() {
  return useQuery({
    queryKey: ['auth-me'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3000/users/me', {
        credentials: 'include',
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      return result;
    },
    retry: false,
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      const res = await fetch('http://localhost:3000/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      return result;
    },
  });
}
