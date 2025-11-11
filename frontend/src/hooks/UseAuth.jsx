import { useState, useEffect, useContext } from 'react';
// 필요한 경우, 인증 컨텍스트나 API 클라이언트 등을 가져옵니다.
// import { AuthContext } from '../context/AuthContext';

/**
 * 사용자 인증 상태를 관리하는 커스텀 훅
 */
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 예시: 컴포넌트 마운트 시 인증 상태를 확인
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ id: payload.sub, role: payload.role });
        setIsAuthenticated(true);
      } catch (err) {
        console.error('토큰 파싱 실패:', err);
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false);
  }, []);

   const login = (token) => {
    localStorage.setItem('token', token);
    const payload = JSON.parse(atob(token.split('.')[1]));
    setUser({ id: payload.sub, role: payload.role });
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
};