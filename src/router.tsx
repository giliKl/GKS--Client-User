import { createBrowserRouter } from 'react-router';
import { JSX, useEffect } from 'react';
import { useNavigate } from 'react-router';
import AppLayout from './Components/AppLayout';
import LogIn from './Components/Users/LogIn';
import Register from './Components/Users/Register';

const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  return children;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'login', element: <LogIn /> },
      { path: 'register', element: <Register /> },
    //   { path: 'upload', element: <UploadFile /> },
    //   { path: 'filelist', element: <FileList /> },
    //   { path: 'view-file', element: <ViewFile /> },
    ],
  },
]);