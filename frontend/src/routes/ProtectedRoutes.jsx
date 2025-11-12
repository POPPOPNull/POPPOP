import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/UseAuth.jsx';

const ProtectedRoute = ({ requiredRoles }) => {
    const { user, isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div>로딩 중...</div>;
    }

    if (!isAuthenticated || !user) {
        // 토큰이 없거나 유효하지 않으면 로그인 페이지로 이동
        return <Navigate to="/auth/login" replace />;
    }

    // 현재 역할이 요구되는 역할 목록에 포함되지 않으면 접근 불가
    if (requiredRoles && requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;