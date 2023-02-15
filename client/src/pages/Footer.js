import "../style/Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="footer">
      <span id="topLink" className="footerElements" onClick={scrollToTop}>
        Back to top
      </span>
    </div>
  );
}
