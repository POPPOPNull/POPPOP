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

  // 새로고침 시 localStorage에서 accessToken을 읽어서 로그인 상태 복원
  useEffect(() => {
    const savedToken = localStorage.getItem('accessToken');
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

  // 로그인 시
  const login = (token) => {
    localStorage.setItem('accessToken', token);
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

