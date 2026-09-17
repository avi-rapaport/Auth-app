import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const navigate = useNavigate();

  const useSignup = useMutation({
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
      return result;
    },

    onSuccess: () => {
      navigate('/login');
    },
  });

  const useMe = useQuery({
    queryKey: ['auth'],
    queryFn: () =>
      fetch('http://localhost:3000/users/me', { credentials: 'include' }).then(
        (res) => res.json()
      ),
  });

  const useLogout = useMutation({
    mutationFn: async () => {
      const res = await fetch('http://localhost:3000/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const result = await res.json();
      return result;
    },
  });

  return {
    useSignup,
    useMe,
    useLogout,
  };
}
