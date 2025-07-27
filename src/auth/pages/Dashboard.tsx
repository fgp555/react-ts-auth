// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { decodeToken } from "../utils/jwt";

const Dashboard = () => {
  const { userState, logout, accessToken } = useAuth();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const refreshToken = localStorage.getItem("refreshToken");
  const refreshDecoded = refreshToken ? decodeToken(refreshToken) : null;
  const refreshExpDate = refreshDecoded?.exp ? new Date(refreshDecoded.exp * 1000).toLocaleString() : null;
  const [currentTime, setCurrentTime] = useState(new Date());
  const [refreshTimeLeft, setRefreshTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!refreshToken) return;

    const { exp } = decodeToken(refreshToken);
    if (!exp) return;

    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const secondsLeft = exp - now;

      if (secondsLeft <= 0) {
        clearInterval(interval);
        setRefreshTimeLeft(0);
      } else {
        setRefreshTimeLeft(secondsLeft);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [refreshToken]);

  useEffect(() => {
    if (!accessToken) return;

    const { exp } = decodeToken(accessToken);
    if (!exp) return;

    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const secondsLeft = exp - now;

      if (secondsLeft <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
      } else {
        setTimeLeft(secondsLeft);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [accessToken]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/auth/login";
  };

  if (!userState) {
    return <p>Cargando usuario...</p>;
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Bienvenido, {userState.name}</h1>
      <p>
        <strong>ID:</strong> {userState._id}
      </p>
      <p>
        <strong>Email:</strong> {userState.email}
      </p>
      <p>
        <strong>Rol:</strong> {userState.role}
      </p>
      <p>
        <strong>Hora actual:</strong> {currentTime.toLocaleTimeString()}
      </p>
      <hr />

      {accessToken && (
        <>
          <p>
            <strong>accessToken expira en:</strong> {timeLeft !== null ? formatTime(timeLeft) : "Cargando..."}
          </p>
          <details>
            <summary>Ver token decodificado</summary>
            <pre>{JSON.stringify(decodeToken(accessToken), null, 2)}</pre>
          </details>
        </>
      )}

      <hr />
      {refreshToken && (
        <>
          <p>
            <strong>refreshToken expira en:</strong>{" "}
            {refreshTimeLeft !== null ? formatTime(refreshTimeLeft) : "Cargando..."}
          </p>
          <details>
            <summary>Ver refresh token</summary>
            <pre>{JSON.stringify(decodeToken(refreshToken), null, 2)}</pre>
          </details>
        </>
      )}

      {refreshExpDate && (
        <p>
          <strong>Refresh token expira el:</strong> {refreshExpDate}
        </p>
      )}

      <button onClick={handleLogout} style={{ marginTop: "1rem" }}>
        Cerrar sesión
      </button>
    </main>
  );
};

export default Dashboard;
