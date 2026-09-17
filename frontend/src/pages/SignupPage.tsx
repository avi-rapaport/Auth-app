import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

interface UserData {
  userName: string;
  email: string;
  password: string;
}

interface Signup {
  message: string;
  newId: number;
}

const SignupPage = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const navigate = useNavigate();

  const { mutate, data, isPending, isError, error } = useMutation({
    mutationFn: (userData: UserData) =>
      fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(userData),
      }).then((res) => res.json),
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      userName: username!.trim(),
      email: email!.trim(),
      password: password!.trim(),
    };

    mutate(userData);
  };

  if (isPending) return <h1>Saving user Info...</h1>;
  if (isError) return <h1>Error: {error.message}</h1>;
  if (data) {
    alert(data);
    setTimeout(() => navigate(`/users/${data.newId}`), 2000);
  }

  return (
    <div>
      <h1>Welcome to my app you can signup in the form below</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
          required
        />
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          required
        />
        <input
          type="text"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          required
        />
      </form>

      <h4>Already have an account?</h4>
      <Link to={'/login'}>Login</Link>
    </div>
  );
};

export default SignupPage;
