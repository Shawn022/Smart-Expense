import { BrowserRouter,Routes,Route } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/dashboard.jsx";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
