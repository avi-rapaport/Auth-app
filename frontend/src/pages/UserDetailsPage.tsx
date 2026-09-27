import UserDetails from '../components/UserDetails';
import { useNavigate } from 'react-router-dom';
import { useLogout, useMe } from '../hooks/useAuth';

const UserDetailsPage = () => {
  const navigate = useNavigate();
  const { isPending: mePending, data: me, error: meError } = useMe();
  const {
    mutate: logout,
    isPending: logoutPending,
    error: logoutError,
  } = useLogout();

  const handleClick = () => {
    logout(undefined, {
      onSuccess: () => navigate('/login'),
      onError: (error) => alert(error.message),
    });
  };

  if (mePending || logoutPending) return <h1>Loading...</h1>;
  if (meError) return <h1>Error: {meError.message}</h1>;
  if (logoutError) return <h1>Error: {logoutError.message}</h1>;

  return (
    <div className="page">
      <UserDetails id={me.id} username={me.userName} email={me.email!} />
      <button onClick={handleClick}>Logout</button>
    </div>
  );
};

export default UserDetailsPage;
