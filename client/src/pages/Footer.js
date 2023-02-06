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
      <Link to="/">
        <h1 className="footerElements">Kei Truck Trader</h1>
      </Link>
      <span id="topLink" className="footerElements" onClick={scrollToTop}>
        Back to top
      </span>
    </div>
  );
}
