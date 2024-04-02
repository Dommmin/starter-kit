import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PageNotFound from './components/PageNotFound.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <div>Hello World!</div>,
        children: [],
    },
    // {
    //     path: '/login',
    //     element: <Login />,
    // },
    // {
    //     path: '/register',
    //     element: <Register />,
    // },
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
