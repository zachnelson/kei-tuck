import Footer from "./Footer";
import Header from "./Header";

export default function Account() {
  return (
    <>
      <Header />
      <Footer />
      {/* {login !== null ? (
        <>
          <Header />
          <div>Hello, {login}</div>
          <Footer />
        </>
      ) : (
        <Navigate to="/login" />
      )} */}
    </>
  );
}
