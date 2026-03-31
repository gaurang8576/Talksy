import React from 'react';
import { ChevronRight } from 'lucide-react';
import {
  BellIcon as Bell,
  LockIcon as Lock,
  PaletteIcon as Palette,
  DownloadIcon as Download,
  HelpCircleIcon as HelpCircle
} from '../../components/common/Icons/SettingsIcons';
import Sidebar from '../../components/layout/Sidebar/Sidebar';
import './Settings.css';

const Settings = ({ theme, setTheme }) => {
  const options = [
    { id: 'notifications', icon: <Bell size={24} />, text: 'Notifications' },
    { id: 'privacy', icon: <Lock size={24} />, text: 'Privacy & Security' },
    { id: 'appearance', icon: <Palette size={24} />, text: 'Appearance' },
    { id: 'data', icon: <Download size={24} />, text: 'Data & Storage' },
    { id: 'help', icon: <HelpCircle size={24} />, text: 'Help & Support' },
  ];

  return (
    <div className="settings-container">
      <Sidebar theme={theme} setTheme={setTheme} />
      <div className="settings-content-wrapper">
        <div className="settings-panel">
          <h1 className="settings-header">Settings</h1>

          {/* Profile Card */}
          <div className="settings-profile-card">
            <img src="https://i.pravatar.cc/150?u=1" alt="Profile" className="settings-profile-avatar" />
            <div className="settings-profile-info">
              <div className="settings-profile-name">Darshan Zalavadiya</div>
              <div className="settings-profile-status">Available</div>
            </div>
            <button className="settings-edit-btn">Edit Profile</button>
          </div>

          {/* Options List */}
          <div className="settings-options-list">
            {options.map(option => (
              <div key={option.id} className="settings-option-item">
                <div className="settings-option-icon">
                  {option.icon}
                </div>
                <div className="settings-option-text">
                  {option.text}
                </div>
                <ChevronRight size={20} className="settings-option-arrow" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;
