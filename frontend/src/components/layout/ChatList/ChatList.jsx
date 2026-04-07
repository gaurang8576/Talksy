import React, { useState } from 'react';
import { Search, Video, Phone, ChevronDown, ChevronUp } from 'lucide-react';
import Input from '../../common/Input/Input';
import { chats, calls } from '../../../data/data';
import './ChatList.css';

const  ChatList = ({ onChatSelect, activeChatId }) => {
  const [activeTab, setActiveTab] = useState('All Chats');
  const [showAllChats, setShowAllChats] = useState(false);
  const [showAllCalls, setShowAllCalls] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = chats.filter(chat => {
    const matchesTab = 
      activeTab === 'Groups' ? chat.isGroup :
      activeTab === 'Contacts' ? !chat.isGroup :
      true;
    
    const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  const filteredCalls = calls.filter(call => 
    call.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedChats = showAllChats ? filteredChats : filteredChats.slice(0, 5);

  const displayedCalls = showAllCalls ? filteredCalls : filteredCalls.slice(0, 5);

  return (
    <div className="chatlist-container">
      <Input
        icon={<Search size={18} />}
        placeholder="Search......"
        containerStyle={{}}
        className="chatlist-search-container"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
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
        {displayedChats.map(chat => (
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
          </div>
        ))}
        {filteredChats.length > 5 && (
          <div 
            className="chatlist-item chatlist-expand-btn" 
            onClick={() => setShowAllChats(!showAllChats)}
          >
            {showAllChats ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </div>
        )}
      </div>

      <div className="chatlist-section">
        <div className="chatlist-section-title">
          Calls
          <div className="chatlist-green-text chatlist-new-meet">⊕ New Meet</div>
        </div>
        {displayedCalls.map(call => (
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
        {calls.length > 5 && (
          <div 
            className="chatlist-item chatlist-expand-btn" 
            onClick={() => setShowAllCalls(!showAllCalls)}
          >
            {showAllCalls ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
