import { NavLink, Link } from 'react-router-dom';
export default function Navbar() {
  return (
    <header className="nav">
      <Link to="/" className="brand">
        <div className="brand-mark">k</div>
        <span>Kroombox</span>
      </Link>
      <nav className="nav-links">
        <NavLink to="/" end>Overview</NavLink>
        <NavLink to="/members">Anggota</NavLink>
        <NavLink to="/partners">Partner</NavLink>
        <NavLink to="/about">Tentang</NavLink>
      </nav>
      <div className="nav-account">v1.0 · 2026</div>
    </header>
  );
}
