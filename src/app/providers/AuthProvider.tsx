import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { setUnauthorizedHandler } from '../../shared/api';
import { tokenService } from '../../shared/lib';
import { getCurrentUser, User } from '../../entities/user';

interface AuthContextValue {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [user, setUser] = useState<User | null>(null);

  const logout = useCallback(() => {
    tokenService.remove();
    setUser(null);
  }, []);

  const login = useCallback((user: User) => {
    tokenService.set(user.token);
    setUser(user);
  }, []);

  useEffect(() => {
    const token = tokenService.get();
    if (!token) {
      return
    }

    if (tokenService.isExpired(token)) {
      logout();
      return;
    }

    getCurrentUser().then(({ user }) => setUser(user)).catch(logout);
  }, [logout]);

  useEffect(() => {
    setUnauthorizedHandler(logout);
  }, [logout]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
