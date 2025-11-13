import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);      // { id, role, type } or null
  const [loading, setLoading] = useState(true);

  // JWT payload 파싱 함수
  const parseJwt = (token) => {
    try {
      const base64Payload = token.split('.')[1];
      const payload = JSON.parse(atob(base64Payload));
      return payload;
    } catch (e) {
      console.error('토큰 파싱 실패', e);
      return null;
    }
  };

  // 🔹 새로고침 시 localStorage에서 accessToken을 읽어서 로그인 상태 복원
  useEffect(() => {
    const savedToken = localStorage.getItem('accessToken');   // ✅ 토큰 키 통일
    if (savedToken) {
      const payload = parseJwt(savedToken);
      if (payload) {
        setUser({
          id: payload.id,       // 토큰에 넣어둔 클레임에 맞게
          role: payload.role,
          type: payload.type,
          token: savedToken,
        });
      } else {
        localStorage.removeItem('accessToken');
      }
    }
    setLoading(false);
  }, []);

  // 로그인 시: accessToken 받았다고 가정
  const login = (token) => {
    localStorage.setItem('accessToken', token);   // ✅ 항상 여기 저장
    const payload = parseJwt(token);
    if (payload) {
      setUser({
        id: payload.id,
        role: payload.role,
        type: payload.type,
        token,
      });
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('accessToken');
  };

  const value = {
    user,
    role: user?.role ?? null,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 컴포넌트에서 사용
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

// 보호된 라우트
export const ProtectedRoute = ({ requiredRoles = [] }) => {
  const { isAuthenticated, role, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>로딩 중...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
    return <div>권한이 없습니다.</div>;
  }

  return <Outlet />;
};
