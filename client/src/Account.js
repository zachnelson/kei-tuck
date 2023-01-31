import { ThemeContext, LoginContext } from "./App";
import Footer from "./Footer";
import Header from "./Header";
import { Navigate } from "react-router-dom";
import { useContext } from "react";

export default function Account() {
  let { login } = useContext(LoginContext);

  return (
    <>
      {login !== null ? (
        <>
          <Header />
          <div>Hello, {login}</div>
          <Footer />
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}
