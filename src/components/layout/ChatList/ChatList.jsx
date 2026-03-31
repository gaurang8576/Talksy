import React, { useState } from 'react';
import { Search, Pin, Video, Phone } from 'lucide-react';
import Input from '../../common/Input/Input';
import './ChatList.css';

const ChatList = ({ onChatSelect, activeChatId }) => {
  const [activeTab, setActiveTab] = useState('All Chats');

  const chats = [
    { id: 1, name: 'Figma Teams', msg: 'Typing.......', time: '2', unread: 2, isTyping: true, pinned: true, avatar: 'https://i.pravatar.cc/150?u=figma' },
    { id: 2, name: 'Darshan Zalavadiya', msg: 'Good', time: '', unread: 0, isTyping: false, avatar: 'https://i.pravatar.cc/150?u=darshan' },
    { id: 3, name: 'School App Client', msg: 'Good Work', time: '', unread: 0, isTyping: false, avatar: 'https://i.pravatar.cc/150?u=school' },
    { id: 4, name: 'Ui/UX Teams', msg: 'I have done my work 👍', time: '', unread: 0, isTyping: false, avatar: 'https://i.pravatar.cc/150?u=ux' },
  ];

  const calls = [
    { id: 1, name: 'Friends', status: 'Joni is Talking....', time: '', avatar: 'https://i.pravatar.cc/150?u=friends', talking: true },
    { id: 2, name: 'Darshan Zalavadiya', status: '30 min ago', time: '', avatar: 'https://i.pravatar.cc/150?u=darshan', talking: false },
    { id: 3, name: 'School App Client', status: 'Yesterday', time: '', avatar: 'https://i.pravatar.cc/150?u=school', talking: false },
    { id: 4, name: 'Ui/UX Teams', status: 'Last Week', time: '', avatar: 'https://i.pravatar.cc/150?u=ux', talking: false },
  ];

  return (
    <div className="chatlist-container">
      <Input
        icon={<Search size={18} />}
        placeholder="Search......"
        containerStyle={{}}
        className="chatlist-search-container"
      />
      
      <div className="chatlist-header">Message</div>

      <div className="chatlist-tabs">
        {['All Chats', 'Groups', 'Contacts'].map(tab => (
          <div 
            key={tab} 
            className={`chatlist-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className="chatlist-section">
        {chats.map(chat => (
          <div 
            key={chat.id} 
            className={`chatlist-item ${activeChatId === chat.id ? 'active-chat' : ''}`}
            onClick={() => onChatSelect(chat)}
          >
           <div className="avatar-wrapper">
             <img src={chat.avatar} alt={chat.name} className="chatlist-avatar" />
             {chat.name.includes("Figma") || chat.name.includes("Darshan") ? <div className="status-dot"></div> : null}
           </div>
           <div className="chatlist-details">
             <div className="chatlist-name">{chat.name}</div>
             <div className={`chatlist-msg ${chat.isTyping ? 'chatlist-green-text' : ''}`}>{chat.msg}</div>
           </div>
           {chat.pinned && <Pin size={14} color="var(--accent-primary)" style={{position:'absolute', top: 12, right: 12}} />}
           {chat.unread > 0 && <span className="chatlist-badge">{chat.unread}</span>}
          </div>
        ))}
      </div>

      <div className="chatlist-section">
        <div className="chatlist-section-title">
          Calls
          <div className="chatlist-green-text" style={{fontSize: '12px', cursor: 'pointer'}}>⊕ New Meet</div>
        </div>
        {calls.map(call => (
          <div 
            key={call.id} 
            className={`chatlist-item ${activeChatId === call.id ? 'active-chat' : ''}`}
            onClick={() => onChatSelect(call)}
          >
            <div className="avatar-wrapper">
              <img src={call.avatar} alt={call.name} className="chatlist-avatar" />
              {call.name.includes("Friends") || call.name.includes("Darshan") ? <div className="status-dot"></div> : null}
            </div>
            <div className="chatlist-details">
              <div className="chatlist-name">{call.name}</div>
              <div className={`chatlist-msg ${call.talking ? 'chatlist-green-text' : ''}`}>{call.status}</div>
            </div>
            <div className="chatlist-call-icons">
              <Video size={16} />
              <Phone size={16} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
