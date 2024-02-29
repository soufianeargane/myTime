import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/client/Home";
import AuthorizedRoute from "./services/AuthorizedRoute";

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
        </Routes>
      </Router>
    </>
  );
}

export default App;
