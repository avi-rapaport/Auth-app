import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignup } from '../hooks/useAuth';

const SignupPage = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const { mutate: signup, isPending } = useSignup();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      userName: username.trim(),
      email: email.trim(),
      password: password.trim(),
    };

    signup(userData, {
      onSuccess: () => navigate('/login'),
      onError: (error) => {
        alert(error.message);
      },
    });
  };

  if (isPending) return <h1>Saving user Info...</h1>;

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
