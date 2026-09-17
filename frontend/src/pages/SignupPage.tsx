import { Link } from 'react-router-dom';

const SignupPage = () => {
  const handleSubmit = () => {};
  return (
    <div>
      <h1>Welcome to my app you can signup in the form below</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" />
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Password" />
      </form>

      <h4>Already have an account?</h4>
      <Link to={'/login'}>Login</Link>
    </div>
  );
};

export default SignupPage;
