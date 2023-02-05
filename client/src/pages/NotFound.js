import { useEffect } from "react";
import "../style/App.css";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  });

  document.body.className = true ? "darkMode" : "";

  return (
    <>
      <div className="center">
        <h1>404 Not Found</h1>
        <img
          src="https://images.cdn.circlesix.co/image/1/700/0/uploads/posts/2015/08/futementales_2015-ago-03-55bee99704b58.jpg"
          alt=""
        />
        <h1>Returning home...</h1>
      </div>
    </>
  );
}
