import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/client/Home";
import AuthorizedRoute from "./services/AuthorizedRoute";
import Apply from "./pages/client/Apply";

// admin pages
import Dashboard from "./pages/admin/Dashboard";
import Requests from "./pages/admin/Requests";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/client/home" element={<Home />} /> */}
          <Route
            path="/client/home"
            element={
              <AuthorizedRoute requiredRole="client" element={<Home />} />
            }
          />
          <Route
            path="/client/apply"
            element={
              <AuthorizedRoute requiredRole="client" element={<Apply />} />
            }
          />

          {/* admin routes */}
          {/* <Route path="/admin/requests" element={<Dashboard />} /> */}
          <Route
            path="/admin/dashboard"
            element={
              <AuthorizedRoute requiredRole="admin" element={<Dashboard />} />
            }
          />
          <Route
            path="/admin/requests"
            element={
              <AuthorizedRoute requiredRole="admin" element={<Requests />} />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
