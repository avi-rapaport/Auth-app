// import { Link } from 'react-router-dom';

// const SignupPage = () => {
//   const [username, setUsername] = useState<string | null>(null);
//   const [password, setPassword] = useState<string | null>(null);

//   const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
//     e.preventDefault();
//   };

//   return (
//     <div>
//       <h1>Welcome to my app you can login in the form below</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Username"
//           onChange={(e) => setUsername(e.target.value)}
//           autoFocus
//           required
//         />
//         <input
//           type="text"
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//           autoFocus
//           required
//         />
//       </form>

//       <h4>Don't have an account?</h4>
//       <Link to={'/signup'}>Signup</Link>
//     </div>
//   );
// };

// export default SignupPage;
