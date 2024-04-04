import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth.js';

export default function Edit() {
   const { user } = useAuth({ middleware: 'auth' });

   if (!user) {
      return <Navigate to="/login" />;
   }

   return (
      <>
         <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
            <UpdateProfileInformationForm className="max-w-xl" />
         </div>

         <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
            <UpdatePasswordForm className="max-w-xl" />
         </div>

         <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
            <DeleteUserForm className="max-w-xl" />
         </div>
      </>
   );
}
