import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthorizedRoute from "./services/AuthorizedRoute";

// client pages
import Home from "./pages/client/Home";
import Apply from "./pages/client/Apply";
import Products from "./pages/client/Products";
// admin pages
import Dashboard from "./pages/admin/Dashboard";
import Requests from "./pages/admin/Requests";

// owner pages
import OwDashboard from "./pages/owner/OwDashboard";
import OwProducts from "./pages/owner/OwProducts";
import OwOrders from "./pages/owner/OwOrders";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
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
          <Route
            path="/store/:id"
            element={
              <AuthorizedRoute requiredRole="client" element={<Products />} />
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

          {/* owner routes */}
          <Route
            path="/owner/dash"
            element={
              <AuthorizedRoute requiredRole="owner" element={<OwDashboard />} />
            }
          />
          <Route
            path="/owner/products"
            element={
              <AuthorizedRoute requiredRole="owner" element={<OwProducts />} />
            }
          />
          <Route
            path="/owner/orders"
            element={
              <AuthorizedRoute requiredRole="owner" element={<OwOrders />} />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
