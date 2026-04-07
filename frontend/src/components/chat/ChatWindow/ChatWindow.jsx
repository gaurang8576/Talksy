import React from 'react';
import { Video, Phone } from 'lucide-react';
import MessageBubble from '../MessageBubble/MessageBubble';
import MessageInput from '../MessageInput/MessageInput';
import { messageDatabase } from '../../../data/mesasedatabase';
import './ChatWindow.css';

const ChatWindow = ({ activeChat }) => {

  // Default to an empty array or generic greeting if no specific messages are mapped
  const messages = activeChat ? (messageDatabase[activeChat.name] || [
    { id: 1, text: `Hey ${activeChat.name}, what's up?`, isOwn: true },
    { id: 2, text: 'Not much, just checking out this chat app.', isOwn: false, avatar: activeChat?.avatar },
  ]) : [];

  if (!activeChat) {
    return (
      <div className="chat-window-container" style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-chat)' }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '18px' }}>Select a chat to start messaging</div>
      </div>
    );
  }

  return (
    <div className="chat-window-container">
      {/* Header */}
      <div className="chat-window-header">
        <div className="chat-user-info">
          <img src={activeChat.avatar} alt="User" className="chat-header-avatar" />
          <div>
            <div className="chat-header-name">{activeChat.name}</div>
            <div className="chat-header-status">{activeChat.status || 'Online'}</div>
          </div>
        </div>
        <div className="chat-header-actions">
          <Video size={24} className="chat-header-btn" />
          <Phone size={24} className="chat-header-btn" />
        </div>
      </div>

      {/* Messages */}
      <div className="chat-messages-area chat-pattern-bg">
        <div className="chat-date-divider">Today, 9:30 am</div>
        {messages.map(msg => (
          <MessageBubble
            key={msg.id}
            message={{ ...msg, avatar: msg.avatar || activeChat?.avatar }}
            isOwn={msg.isOwn}
          />
        ))}
      </div>

      {/* Input */}
      <MessageInput />
    </div>
  );
};

export default ChatWindow;
