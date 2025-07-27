// src/utils/jwt.ts
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  sub?: string;
  userId?: string;
  name?: string;
  username?: string;
  email: string;
  role?: string;
  [key: string]: any;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export const decodeToken = (accessToken: string): User => {
  const decoded: DecodedToken = jwtDecode(accessToken);

  return {
    _id: decoded.userId || decoded.sub || "",
    name: decoded.name || decoded.username || decoded.email || "Desconocido",
    email: decoded.email,
    role: decoded.role || "user",
    iat: decoded.iat,
    exp: decoded.exp,
  };
};

export const isTokenValid = (accessToken: string): boolean => {
  try {
    const decoded: DecodedToken = jwtDecode(accessToken);

    if (!decoded.exp) return false;

    const currentTime = Math.floor(Date.now() / 1000); // tiempo actual en segundos
    return decoded.exp > currentTime;
  } catch (err) {
    return false;
  }
};
