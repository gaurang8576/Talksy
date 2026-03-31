import React from 'react';
import './MessageBubble.css';

const MessageBubble = ({ message, isOwn }) => {
  return (
    <div className={`message-bubble-container ${isOwn ? 'own' : 'other'}`}>
        <div className="message-bubble-content">
            {!isOwn && message.avatar && <img src={message.avatar} alt="Sender" className="message-avatar" />}
            <div className={`message-bubble ${isOwn ? 'own' : 'other'}`}>
                {message.text}
            </div>
        </div>
    </div>
  );
};

export default MessageBubble;
