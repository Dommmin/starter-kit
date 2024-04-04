import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/auth';
import InputError from '../components/InputError.jsx';
import AuthSessionStatus from './AuthSessionStatus.jsx';

export default function Login() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [shouldRemember, setShouldRemember] = useState(false);
   const [errors, setErrors] = useState([]);
   const [status, setStatus] = useState(null);
   const location = useLocation();
   const query = new URLSearchParams(location.search);
   const reset = query.get('reset');

   const { login, isLoading } = useAuth({
      middleware: 'guest',
      redirectIfAuthenticated: '/',
   });

   useEffect(() => {
      if (reset?.length > 0 && errors.length === 0) {
         setStatus(atob(reset));
      } else {
         setStatus(null);
      }
   }, [reset, errors]);

   const submitForm = async (event) => {
      event.preventDefault();

      await login({
         email,
         password,
         remember: shouldRemember,
         setErrors,
         setStatus,
      });
   };

   const handleLoginAsAdmin = async (event) => {
      event.preventDefault();

      await login({
         email: 'admin@example.com',
         password: 'password',
         remember: shouldRemember,
         setErrors,
         setStatus,
      });
   };

   const handleLoginAsUser = async (event) => {
      event.preventDefault();

      await login({
         email: 'user@example.com',
         password: 'password',
         remember: shouldRemember,
         setErrors,
         setStatus,
      });
   };

   return (
      <div className="flex items-center justify-center min-h-screen max-w-lg mx-auto">
         <AuthSessionStatus className="mb-4" status={status} />
         <form
            onSubmit={submitForm}
            className="flex flex-col items-center justify-center w-full space-y-4 card bg-white dark:bg-gray-800 glass shadow-xl py-8"
         >
            <h1 className="font-bold text-3xl text-gray-200">Login to your account</h1>
            <label className="form-control w-full max-w-md">
               <div className="label">
                  <span className="label-text text-gray-200">E-mail</span>
               </div>
               <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  className="input input-bordered input-primary w-full max-w-md"
               />
               <InputError messages={errors.email} className="mt-2" />
            </label>
            <label className="form-control w-full max-w-md">
               <div className="label">
                  <span className="label-text text-gray-200">Password</span>
               </div>
               <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  className="input input-bordered input-primary w-full max-w-md"
                  autoComplete="old-password"
               />
               <InputError messages={errors.password} className="mt-2" />
            </label>
            <div className="flex w-full justify-between items-center max-w-md">
               <label className="label cursor-pointer">
                  <input
                     checked={shouldRemember}
                     onChange={(event) => setShouldRemember(event.target.checked)}
                     type="checkbox"
                     className="checkbox checkbox-primary"
                  />
                  <span className="label-text text-gray-200 ml-2">Remember me</span>
               </label>
               <Link className="link link-hover text-info font-bold tracking-wide" to="/forgot-password">
                  Forgot password?
               </Link>
            </div>
            <div>
               <span className="text-gray-200">{"Don't have an account? "}</span>
               <Link className="link link-hover text-error font-bold tracking-wide" to="/register">
                  Register
               </Link>
            </div>
            <button
               className="btn btn-primary w-full max-w-md uppercase tracking-widest font-bold text-gray-200"
               type="submit"
               disabled={isLoading}
            >
               {isLoading ? <span className="loading loading-spinner"></span> : 'sign in'}
            </button>
            <div className="flex w-full justify-between items-center max-w-md pt-2">
               <button onClick={handleLoginAsUser} className="btn btn-default btn-sm">
                  Login as User
               </button>
               <button onClick={handleLoginAsAdmin} className="btn btn-default btn-sm">
                  Login as Admin
               </button>
            </div>
         </form>
      </div>
   );
}
