import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PageNotFound from './components/PageNotFound.jsx';
import Login from './Auth/Login.jsx';
import Register from './Auth/Register.jsx';
import ForgotPassword from './Auth/ForgotPassword.jsx';
import VerifyEmail from './Auth/VerifyEmail.jsx';
import PasswordReset from './Auth/PasswordReset.jsx';
import AppLayout from './Layouts/AppLayout.jsx';
import ProfileEdit from './Profile/Edit.jsx';

const router = createBrowserRouter([
   {
      path: '/',
      element: <AppLayout />,
      children: [
         {
            path: '/profile',
            element: <ProfileEdit />,
         },
         {
            path: '/dashboard',
            element: <div>Dashboard</div>,
         },
      ],
   },
   {
      path: '/login',
      element: <Login />,
   },
   {
      path: '/register',
      element: <Register />,
   },
   {
      path: '/forgot-password',
      element: <ForgotPassword />,
   },
   {
      path: '/verify-email',
      element: <VerifyEmail />,
   },
   {
      path: '/password-reset/:token',
      element: <PasswordReset />,
   },
   {
      path: '*',
      element: <PageNotFound />,
   },
]);

const queryClient = new QueryClient({
   defaultOptions: {
      staleTime: 5000,
   },
});

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <QueryClientProvider client={queryClient}>
         <RouterProvider router={router} />
      </QueryClientProvider>
   </React.StrictMode>,
);
