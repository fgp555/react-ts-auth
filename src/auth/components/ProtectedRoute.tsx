import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { isTokenValid } from "../utils/jwt";
import { refreshToken } from "../utils/refreshToken";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ProtectedRoute = () => {
  const { accessToken, hydrated, setAccessToken, logout } = useAuth();
  const dispatch = useDispatch();
  const [checkedToken, setCheckedToken] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    const validateOrRefresh = async () => {
      if (!hydrated) return;

      if (accessToken && isTokenValid(accessToken)) {
        setIsValidToken(true);
      } else {
        const newToken = await refreshToken();
        if (newToken) {
          setAccessToken(newToken);
          setIsValidToken(true);
        } else {
          logout();
        }
      }
      setCheckedToken(true);
    };

    validateOrRefresh();
  }, [accessToken, hydrated, dispatch]);

  if (!hydrated || !checkedToken) return null; // o un spinner

  if (!isValidToken) {
    const lastURL = window.location.pathname + window.location.search + window.location.hash;
    localStorage.setItem("lastURL", lastURL);
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
