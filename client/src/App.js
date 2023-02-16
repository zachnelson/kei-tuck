import "./style/App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Account from "./pages/Account";
import Truck from "./pages/Truck";
import { Routes, Route } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function App() {
  const { user } = useAuthContext();
  const search = useLocation().search;
  const searchParams = new URLSearchParams(search);
  const id = searchParams.get("id");

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/inventory/:id" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/account"
        element={user ? <Account /> : <Navigate to="/" />}
      />
      <Route path="/truck" element={<Truck id={id} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
