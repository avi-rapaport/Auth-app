import { Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useMe, useLogout } from './hooks/useAuth';

const ProtectedRoutes = () => {
  const { isPending, isError } = useMe();
  const { mutate: logout } = useLogout();

  useEffect(() => {
    if (isError) {
      logout();
    }
  }, [isError, logout]);

  if (isPending) return <h1>Verifying...</h1>;

  if (isError) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
