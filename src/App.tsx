// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Login from "./auth/pages/Login";
import Dashboard from "./auth/pages/Dashboard";
// import GoogleSuccessRedirect from "./auth/pages/GoogleSuccessRedirect";
import ProtectedRoute from "./auth/components/ProtectedRoute";
import LoginGoogleRedirect from "./auth/pages/LoginGoogleRedirect";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/login-google" element={<LoginGoogleRedirect />} />

      {/* Rutas protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Puedes agregar más rutas protegidas aquí */}
      </Route>

      <Route path="*" element={<div>404 page</div>} />
    </Routes>
  );
}

export default App;
