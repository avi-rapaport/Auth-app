import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
//import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProtectedRoutes from './ProtectedRoutes';
import UserDetailsPage from './pages/UserDetailsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      {/* <Route path="/login" element={<LoginPage />} /> */}

      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Navigate to={'/signup'} />} />
        <Route path="/users/:id" element={<UserDetailsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>;
}

export default App;
