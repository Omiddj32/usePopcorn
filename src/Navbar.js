import Lego from "./Lego";

//Navbar component
export default function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Lego />
      {children}
    </nav>
  );
}
