import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useAuth';

const LoginPage = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const { mutate: login, isPending } = useLogin();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      userName: username.trim(),
      password: password.trim(),
    };

    login(userData, {
      onSuccess: () => navigate(`/users/${username}`),
      onError: (error) => alert(error.message),
    });
  };

  if (isPending) return <h1>Checking user Info...</h1>;

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

export default LoginPage;
