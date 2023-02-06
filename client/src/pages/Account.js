import Footer from "./Footer";
import Header from "./Header";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  if (!user) navigate("/");

  return (
    <>
      <Header />
      <Footer />
    </>
  );
}
