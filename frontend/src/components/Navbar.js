import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const NAV_LINKS = [
  { to: '/dashboard', label: 'Dashboard',  icon: '⬡' },
  { to: '/recommend', label: 'AI Suggest', icon: '◈' },
  { to: '/jobs',      label: 'Live Jobs',  icon: '◉' },
  { to: '/profile',   label: 'Profile',    icon: '◎' },
  { to: '/history',   label: 'History',    icon: '◷' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/dashboard" className="navbar-logo">
          <span className="logo-icon">⬡</span>
          <span className="logo-text">Career<span className="logo-accent">Compass</span></span>
        </Link>

        {/* Desktop links */}
        <ul className="navbar-links">
          {NAV_LINKS.map(({ to, label, icon }) => (
            <li key={to}>
              <Link
                to={to}
                className={`nav-link ${location.pathname === to ? 'active' : ''}`}
              >
                <span className="nav-icon">{icon}</span>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* User + logout */}
        <div className="navbar-user">
          <span className="user-chip">
            <span className="user-avatar">{user?.username?.[0]?.toUpperCase()}</span>
            <span className="user-name">{user?.username}</span>
          </span>
          <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
            Sign out
          </button>
        </div>

        {/* Mobile hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen(o => !o)}>
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {NAV_LINKS.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              className={`mobile-link ${location.pathname === to ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {icon} {label}
            </Link>
          ))}
          <button className="btn btn-ghost" onClick={handleLogout} style={{ marginTop: 8 }}>
            Sign out
          </button>
        </div>
      )}
    </nav>
  );
}
