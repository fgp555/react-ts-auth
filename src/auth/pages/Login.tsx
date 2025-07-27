// src/pages/Login.tsx
import { baseUrl } from "../../lib/constants";
import { useAuth } from "../hooks/useAuth";
import { useRedirectToLastURL } from "../hooks/useRedirectToLastURL";
import axiosInstance from "../../lib/axiosInstance";
import React, { useEffect, useState } from "react";

const Login = () => {
  const { setAccessToken, setRefreshToken, setUser, error, userState, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin@gmail.com");
  const redirectToLastURL = useRedirectToLastURL();

  useEffect(() => {
    if (isAuthenticated) {
      redirectToLastURL();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/api/auth/login", { email, password });
      setAccessToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
    } finally {
      redirectToLastURL();
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = baseUrl + "/api/oauth/login";
  };

  return (
    <main>
      <pre>{JSON.stringify(userState, null, 2)}</pre>
      <form onSubmit={handleLogin}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <hr />
      <button onClick={handleGoogleLogin}>Login with Google</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </main>
  );
};

export default Login;
