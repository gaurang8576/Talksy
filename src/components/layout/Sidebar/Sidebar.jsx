import React from 'react';
import { Home, Search, Bookmark, Share2, Settings, Sun, Moon } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <svg fill="currentColor" width="32" height="32" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5z" /></svg>
      </div>

      <div className="sidebar-nav-item active">
        <Home size={24} />
        <span>Home</span>
      </div>
      <div className="sidebar-nav-item">
        <Search size={24} />
        <span>Search</span>
      </div>
      {/* <div className="sidebar-nav-item">
        <Bookmark size={24} />
        <span>Save</span>
      </div> */}
      <div className="sidebar-nav-item">
        <Share2 size={24} />
        <span>Share</span>
      </div>
      <div className="sidebar-nav-item">
        <Settings size={24} />
        <span>Setting</span>
      </div>

      <div className="sidebar-theme-toggle">
        <div className="theme-btn active"><Sun size={18} /></div>
        <div className="theme-btn"><Moon size={18} /></div>
      </div>

      <img src="https://i.pravatar.cc/150?u=1" alt="Profile" className="sidebar-avatar" />
    </div>
  );
};

export default Sidebar;
