import useSWR from 'swr';
import { useEffect, useState } from 'react';
import axios from '../lib/axios.js';
import { useNavigate, useParams } from 'react-router-dom';

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const navigate = useNavigate();
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);

    const {
        data: user,
        error,
        mutate,
    } = useSWR('/api/user', () =>
        axios
            .get('/api/user')
            .then((res) => res.data)
            .catch((error) => {
                if (error.response.status !== 409) throw error;

                navigate('/verify-email');
            }),
    );

    const csrf = () => axios.get('/sanctum/csrf-cookie');

    const register = async ({ setErrors, ...props }) => {
        setIsLoading(true);
        await csrf();

        setErrors([]);

        axios
            .post('/register', props)
            .then(() => mutate())
            .catch((error) => {
                if (error.response.status !== 422) throw error;

                setErrors(error.response.data.errors);
            })
            .finally(() => setIsLoading(false));
    };

    const login = async ({ setErrors, ...props }) => {
        setIsLoading(true);
        await csrf();

        setErrors([]);

        axios
            .post('/login', props)
            .then(() => mutate())
            .catch((error) => {
                if (error.response.status !== 422) throw error;

                setErrors(error.response.data.errors);
            })
            .finally(() => setIsLoading(false));
    };

    const forgotPassword = async ({ setErrors, email }) => {
        await csrf();

        setErrors([]);

        axios
            .post('/forgot-password', { email })
            .then((response) => response.data.status)
            .catch((error) => {
                if (error.response.status !== 422) throw error;

                setErrors(error.response.data.errors);
            });
    };

    const resetPassword = async ({ setErrors, ...props }) => {
        await csrf();

        setErrors([]);

        axios
            .post('/reset-password', { token: params.token, ...props })
            .then((response) => navigate('/login?reset=' + btoa(response.data.status)))
            .catch((error) => {
                if (error.response.status !== 422) throw error;

                setErrors(error.response.data.errors);
            });
    };

    const resendEmailVerification = ({ setStatus }) => {
        axios.post('/email/verification-notification').then((response) => setStatus(response.data.status));
    };

    const logout = async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate());
        }

        window.location.pathname = '/login';
    };

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user) navigate(redirectIfAuthenticated);
        if (window.location.pathname === '/verify-email' && user?.email_verified_at) navigate(redirectIfAuthenticated);
        if (middleware === 'auth' && error) logout();
    }, [user, error]);

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
        isLoading,
    };
};
