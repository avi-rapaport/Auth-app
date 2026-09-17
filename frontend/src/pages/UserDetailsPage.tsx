import UserDetails from '../components/UserDetails';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const UserDetailsPage = () => {
  const navigate = useNavigate();
  const { useMe, useLogout } = useAuth();

  const handleClick = () => {
    useLogout.mutate();
    navigate('/login');
  };

  if (useMe.isPending || useLogout.isPending) return <h1>Loading...</h1>;
  if (useMe.isError) return <h1>Error: {useMe.error.message}</h1>;
  if (useLogout.isError) return <h1>Error: {useLogout.error.message}</h1>;

  return (
    <div className="page">
      <UserDetails
        id={useMe.data.id}
        username={useMe.data.userName}
        email={useMe.data.email!}
      />
      <button onClick={handleClick}>Logout</button>
    </div>
  );
};

export default UserDetailsPage;
