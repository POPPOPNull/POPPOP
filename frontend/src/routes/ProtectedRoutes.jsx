import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/UseAuth.jsx';

const ProtectedRoute = ({ requiredRoles }) => {
    const { user, isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (!isAuthenticated || !user) {
        
        const isAdminPath = location.pathname.startsWith('/admin');
        const loginPath = isAdminPath ? '/admin/login' : '/auth/login';

        return <Navigate to={loginPath} state={{ from: location }} replace />;
    }

    // 현재 역할이 요구되는 역할 목록에 포함되지 않으면 각 역할에 맞는 로그인 페이지로 이동
    if (requiredRoles && requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
        const targetLoginPath = requiredRoles.includes('ADMIN') ? '/admin/login' : '/auth/login';
        return <Navigate to={targetLoginPath} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;