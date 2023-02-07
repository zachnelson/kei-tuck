import "../style/Sidebar.css";
export default function Sidebar({ children }) {
  return (
    <div className="sidebarContainer">
      <nav className="sidebar">
        <ul>
          {children.map((child) => {
            return <li>{child}</li>;
          })}
        </ul>
      </nav>
    </div>
  );
}
