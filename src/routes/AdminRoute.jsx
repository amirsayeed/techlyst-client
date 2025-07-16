import React, { Children } from 'react';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import { Navigate } from 'react-router';
import Loading from '../components/Shared/Loading/Loading';


const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useUserRole();

    if (loading || roleLoading) {
        return <Loading/>
    }

    if (!user || role !== 'admin') {
        return <Navigate state={ location.pathname } to="/forbidden"/>
    }

    return children;
};

export default AdminRoute;