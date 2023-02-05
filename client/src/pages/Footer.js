import "../style/Footer.css";
export default function Footer() {
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="footer">
      <h1 className="footerElements">Kei Truck Trader</h1>
      <span id="topLink" className="footerElements" onClick={scrollToTop}>
        Back to top
      </span>
    </div>
  );
}
