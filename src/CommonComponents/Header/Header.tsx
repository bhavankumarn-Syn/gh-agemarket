import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.scss';
import logo from '../../assets/syn_market_logo.png';
import vector from '../../assets/Vector.png'
import { useAuth } from '../../Context/AuthContext';
import { signOut } from '../../api/auth';
import mixpanel from "mixpanel-browser";
import { userLogoutTrack } from '../../utils/mixpanel';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  const profileRef = useRef<HTMLLIElement | null>(null);

  const { user, logout } = useAuth();
  const location = useLocation();

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = (): void => {
    setIsMenuOpen(false);
  };

  const toggleProfile = (): void => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = (): void => {
    userLogoutTrack();

    // aws-amplify signout function
    signOut()
    // Context logout function to clear user state
    logout()
    setIsProfileOpen(false);
    setIsMenuOpen(false);
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function capitalizeFirstLetter(text:string) {
        if(text){
            return text.charAt(0).toUpperCase() + text.slice(1);
        }
    }
  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className="header">
      <div className="container">
        {/* Logo */}
        <div className="logo">
          <Link to="/" onClick={closeMenu}>
            <span className="logo-text">
              <img src={logo} alt="Logo" />
            </span>
          </Link>
        </div>

        {/* Hamburger */}
        <div className="hamburger" onClick={toggleMenu}>
          <div className={`hamburger-icon ${isMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Navigation */}
        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">

            <li className="nav-item">
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  closeMenu();
                }}
              >
                Agent Seller
              </Link>
            </li>

            {!user && (
              <li className="nav-item">
                <Link to="/auth" onClick={closeMenu}>
                  Signup/Login
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link
                to="/agent-list"
                className="btn btn-primary"
                onClick={closeMenu}
              >
                Explore AI Agents
              </Link>
            </li>

            {/* Profile Dropdown */}
            {user && (
              <li className="nav-item profile-menu" ref={profileRef}>
                <div className="profile-icon" onClick={toggleProfile}>
                  👤
                </div>

                {isProfileOpen && (
                  <ul className="profile-dropdown">
                    <li><Link to='/dashboard'>Dashboard</Link></li>
                    <li className="profile-name">{capitalizeFirstLetter(user.name)}</li>
                    <li onClick={handleLogout}>Logout</li>
                  </ul>
                )}
              </li>
            )}

          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;