import { createBrowserRouter } from 'react-router';
import { JSX, useEffect } from 'react';
import { useNavigate } from 'react-router';
import AppLayout from './Components/AppLayout';
import LogIn from './Components/Users/LogIn';
import Register from './Components/Users/Register';
import userStore from './Components/Users/UserStore';
import Dashboard from './Components/Users/Dashboard';
import About from './Components/About';
import UploadFile from './Components/Files/UploadFile';
import FileList from './Components/Files/FileList';
import ViewFile from './Components/Files/ViewFile';


const TOKEN_EXPIRATION_TIME = 1000* 60 * 60 * 2; 

const isAuthenticated = (): boolean => {
  const token = userStore.token;
  const loginTime = sessionStorage.getItem("loginTime");
console.log('isAuthenticated', token, loginTime);

  if (!token || !loginTime) return false;

  const elapsedTime = Date.now() - parseInt(loginTime, 10);
  if (elapsedTime > TOKEN_EXPIRATION_TIME) {
    userStore.logout();
    console.log('Token expired');
    
    return false;
  }

  return true;
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
      {path:'',element: <ProtectedRoute><Dashboard/></ProtectedRoute>},
      {path:'about',element: <ProtectedRoute><About/></ProtectedRoute>},
      { path: 'upload', element: <ProtectedRoute><UploadFile /></ProtectedRoute>},
      { path: 'filelist', element: <ProtectedRoute><FileList /></ProtectedRoute> },
      { path: 'view-file', element: <ProtectedRoute><ViewFile /></ProtectedRoute> },
      { path: 'login', element: <LogIn /> },
      { path: 'register', element: <Register /> }
    ],
  },
]);