import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const SignupPage = () => {
  const [username, setUsername] = useState<string | null>('');
  const [email, setEmail] = useState<string | null>('');
  const [password, setPassword] = useState<string | null>('');

  const { useSignup } = useAuth();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      userName: username!.trim(),
      email: email!.trim(),
      password: password!.trim(),
    };

    useSignup.mutate(userData);
  };

  if (useSignup.isPending) return <h1>Saving user Info...</h1>;
  if (useSignup.isError) return <h1>Error: {useSignup.error.message}</h1>;

  return (
    <div className="page">
      <h1>Welcome to my app you can signup in the form below</h1>
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
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input"
          type="text"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
      </form>

      <h4>Already have an account?</h4>
      <Link to={'/login'}>Login</Link>
    </div>
  );
};

export default SignupPage;
