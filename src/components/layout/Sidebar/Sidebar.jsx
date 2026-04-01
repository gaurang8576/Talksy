import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Settings, Sun, Moon, LogOut, LogIn, UserPlus } from 'lucide-react';
import talksy_logo from '../../../assets/images/talksy_logo.png';
import { useTheme } from '../../../context/ThemeContext';
import './Sidebar.css';

const Sidebar = ({ onHomeClick, onLogout, isAuth = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const handleHomeClick = () => {
    navigate('/');
    if (onHomeClick) {
      onHomeClick();
    }
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={talksy_logo} alt="Talksy Logo" className="sidebar-logo-img" />
      </div>

      {!isAuth ? (
        <>
          <div
            className={`sidebar-nav-item ${location.pathname === '/' || location.pathname === '/home' ? 'active' : ''}`}
            onClick={handleHomeClick}
          >
            <Home size={20} />
            <span>Home</span>
          </div>

          <div
            className={`sidebar-nav-item ${location.pathname === '/settings' ? 'active' : ''}`}
            onClick={handleSettingsClick}
          >
            <Settings size={20} />
            <span>Setting</span>
          </div>
        </>
      ) : (
        <>
          <div
            className={`sidebar-nav-item ${location.pathname === '/login' ? 'active' : ''}`}
            onClick={() => navigate('/login')}
          >
            <LogIn size={20} />
            <span>Login</span>
          </div>

          <div
            className={`sidebar-nav-item ${location.pathname === '/register' ? 'active' : ''}`}
            onClick={() => navigate('/register')}
          >
            <UserPlus size={20} />
            <span>Register</span>
          </div>
        </>
      )}

      <div className="sidebar-theme-toggle">
        <div
          className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
          onClick={() => setTheme('light')}
        >
          <Sun size={18} />
        </div>
        <div
          className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
          onClick={() => setTheme('dark')}
        >
          <Moon size={18} />
        </div>
      </div>

      {!isAuth && (
        <div className="sidebar-logout">
          <div
            className="sidebar-logout-btn"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </div>
        </div>
      )}

      {!isAuth && (
        <img src="https://i.pravatar.cc/150?u=1" alt="Profile" className="sidebar-avatar" />
      )}
    </div>
  );
};

export default Sidebar;
