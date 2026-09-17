import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedRoutes = () => {
  const navigate = useNavigate();

  const user = false;
  if (!user) {
    navigate('/signup');
  }

  return <Outlet />;
};

export default ProtectedRoutes;
