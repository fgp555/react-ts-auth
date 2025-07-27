// src/hooks/useAuth.ts
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/reduxStore";
import type { IUserState } from "../features/authSlice";
import {
  logout as logoutAction,
  setAccessToken as setAccessTokenAction,
  setUser as setUserAction,
  setError,
  setLoading,
} from "../features/authSlice";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { accessToken, userState, loading, error } = useSelector((state: RootState) => state.auth);
  const [hydrated, setHydrated] = useState(false); // NUEVO

  // Cargar desde localStorage una vez
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const user = localStorage.getItem("user");

    if (token) dispatch(setAccessTokenAction(token));
    if (user) dispatch(setUserAction(JSON.parse(user)));

    setHydrated(true);
  }, [dispatch]);

  const persistAccessToken = (token: string) => {
    localStorage.setItem("accessToken", token);
    dispatch(setAccessTokenAction(token));
  };

  const persistRefreshToken = (token: string) => {
    localStorage.setItem("refreshToken", token);
  };

  const persistUser = (user: IUserState) => {
    localStorage.setItem("user", JSON.stringify(user));
    dispatch(setUserAction(user));
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
    const lastURL = window.location.pathname + window.location.search + window.location.hash;
    localStorage.setItem("lastURL", lastURL);
    dispatch(logoutAction());
  };

  const isAuthenticated = !!accessToken && !!userState;
  const hasRole = (role: string): boolean => userState?.role === role;
  const hasPermission = (roles: string[]): boolean => (userState ? roles.includes(userState.role) : false);
  const hasAnyRole = (...roles: string[]): boolean => (userState ? roles.includes(userState.role) : false);

  return {
    // Estado
    isAuthenticated,
    accessToken,
    userState,
    hydrated,
    loading,
    error,

    // Acciones Redux + persistencia
    logout,
    setAccessToken: persistAccessToken,
    setRefreshToken: persistRefreshToken,
    setUser: persistUser,
    setLoading: (loading: boolean) => dispatch(setLoading(loading)),
    setError: (error: string | null) => dispatch(setError(error)),

    // Utilidades
    hasRole,
    hasPermission,
    hasAnyRole,
  };
};
