import { Outlet, useNavigate } from 'react-router-dom';
import { useFetch } from './hooks/useFetch';

const ProtectedRoutes = () => {
  const navigate = useNavigate();

  const { loading, error } = useFetch('http://localhost:3000/users/me');

  if (loading) return <h1>Verifying...</h1>;

  if (error) {
    navigate('/login');
  }

  return <Outlet />;
};

export default ProtectedRoutes;
