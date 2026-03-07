// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import UserDashboard from "./pages/UserDashboard";
import HandlerDashboard from "./pages/HandlerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["USER"]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/handler"
            element={
              <ProtectedRoute allowedRoles={["HANDLER"]}>
                <HandlerDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;