import React from 'react';
import useUserRole from '../../../hooks/useUserRole';
import Loading from '../../../components/Shared/Loading/Loading';
import UserDashboard from './UserDashboard';
import ModeratorDashboard from './ModeratorDashboard';
import AdminDashboard from './AdminDashboard';
import Forbidden from '../../Forbidden/Forbidden';

const DashboardHome = () => {
    const { role, roleLoading } = useUserRole();
    
    if (roleLoading) {
        return <Loading />;
    }

    if(role === 'user'){
        return <UserDashboard/>
    }
    else if(role === 'moderator'){
        return <ModeratorDashboard/>
    }
    else if(role ==='admin'){
        return <AdminDashboard/>
    }
    else {
        return <Forbidden/>
    }
};

export default DashboardHome;