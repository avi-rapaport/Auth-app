import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (userData: { userName: string; password: string }) => {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(userData),
      });
      const result = await res.json();
      return result;
    },

    onSuccess: () => {
      navigate(`/users/${username}`);
    },
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      userName: username!.trim(),
      password: password!.trim(),
    };

    mutate(userData);
  };

  if (isPending) return <h1>Saving user Info...</h1>;
  if (isError) return <h1>Error: {error.message}</h1>;

  return (
    <div className="page">
      <h1>Welcome to my app you can login in the form below</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
          required
        />
        <input
          className="input"
          type="text"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      <h4>Don't have an account?</h4>
      <Link to={'/signup'}>Signup</Link>
    </div>
  );
};

export default SignupPage;
