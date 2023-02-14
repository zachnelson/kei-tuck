import "../style/Sidebar.css";
export default function Sidebar({ children }) {
  return (
    <div className="sidebarContainer">
      <nav className="sidebar">
        <ul>
          {children.map((child, index) => {
            return <li key={child + index}>{child}</li>;
          })}
        </ul>
      </nav>
    </div>
  );
}
