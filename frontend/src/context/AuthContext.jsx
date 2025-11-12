import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

// Context 생성
const AuthContext = createContext(null);

// AuthProvider: 앱 최상단에서 감싸서 사용
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);      // { id, role, ... } or null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('token');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = (userObj) => {
    setUser(userObj);
    localStorage.setItem('token', JSON.stringify(userObj));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const value = {
    user,                    // 전체 유저 객체
    role: user?.role ?? null, // 편하게 role만 쓰고 싶을 때
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// useAuth 훅: 컴포넌트에서 사용
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

/*
 ProtectedRoute 사용법 예시:
 <Route element={<ProtectedRoute requiredRoles={['ADMIN']} />}>
    <Route path="/admin" element={<AdminMain />} />
 </Route>
*/
// ProtectedRoute 컴포넌트 (중첩 라우팅을 위한 Outlet 사용)
export const ProtectedRoute = ({ requiredRoles = [] }) => {
  const { isAuthenticated, role, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>로딩 중...</div>;
  if (!isAuthenticated) {
    // 로그인으로 보낼 때 현재 경로 정보를 state로 넘겨 리다이렉트 후 복구 가능
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
    // 권한이 없으면 접근 금지 (원하면 /forbidden 페이지로)
    return <div>권한이 없습니다.</div>;
  }
  // 인증 및 권한 OK -> 하위 라우트 렌더
  return <Outlet />;
};