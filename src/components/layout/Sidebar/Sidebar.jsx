import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, Bookmark, Share2, Settings, Sun, Moon, LogOut } from 'lucide-react';
import talksy_logo from '../../../assets/images/talksy_logo.png';
import './Sidebar.css';

const Sidebar = ({ onHomeClick, theme, setTheme, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

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

      <div
        className={`sidebar-nav-item ${location.pathname === '/' ? 'active' : ''}`}
        onClick={handleHomeClick}
      >
        <Home size={24} />
        <span>Home</span>
      </div>
      {/* <div className="sidebar-nav-item">
        <Search size={24} />
        <span>Search</span>
      </div> */}
      {/* <div className="sidebar-nav-item">
        <Bookmark size={24} />
        <span>Save</span>
      </div> */}
      {/* <div className="sidebar-nav-item">
        <Share2 size={24} />
        <span>Share</span>
      </div> */}
      <div
        className={`sidebar-nav-item ${location.pathname === '/settings' ? 'active' : ''}`}
        onClick={handleSettingsClick}
      >
        <Settings size={24} />
        <span>Setting</span>
      </div>

      <div className="sidebar-theme-toggle">
        <div 
          className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
          onClick={() => setTheme && setTheme('light')}
        >
          <Sun size={18} />
        </div>
        <div 
          className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
          onClick={() => setTheme && setTheme('dark')}
        >
          <Moon size={18} />
        </div>
      </div>

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

      <img src="https://i.pravatar.cc/150?u=1" alt="Profile" className="sidebar-avatar" />
    </div>
  );
};

export default Sidebar;
