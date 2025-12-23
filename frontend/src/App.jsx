import {  Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/dashboard.jsx";

function App() {

  return (
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
  )
}

export default App
