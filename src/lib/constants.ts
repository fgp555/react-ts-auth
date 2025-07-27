// src/lib/constants.ts
const viteApiURL = import.meta.env.VITE_API_URL || "http://localhost:3000";
export const VITE_REMOVE_BG = import.meta.env.VITE_REMOVE_BG;

export const isLocalhost =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

export const baseUrl = isLocalhost
  ? viteApiURL
  : window.location.hostname === "vite.fgp.one"
  ? "https://back.fgp.one"
  : "";

export const apiBaseURL = baseUrl + "/api";

export let TURNSTILE_CLIENT_KEY = "0x4AAAAAABbUSOZWSWvcDOez";
export let isDevelopment = isLocalhost || window.location.hostname === "back.fgp.one";
export let adminEmail = isLocalhost ? atob("ZmdwNTU1QGdtYWlsLmNvbQ==") : "";
export let adminPassword = isLocalhost ? atob("ZmdwNTU1QGdtYWlsLmNvbQ==") : "";
export let iconUserUrl = "https://i.postimg.cc/GmddyvS1/icon-user.webp";
export let playStoreUrl = "https://play.google.com/store/apps/details?id=com.fgp555.transpaservic";

console.log("apiBaseURL", apiBaseURL);
