import React from 'react';
import { Paperclip, Smile, Camera, Mic } from 'lucide-react';
import './MessageInput.css';

const MessageInput = () => {
  return (
    <div className="message-input-container">
      <div className="message-input-wrapper">
        <div className="message-icon-btn"><Smile size={20} /></div>
        <input 
          className="message-input-field" 
          placeholder="Message........." 
        />
        <div className="message-icon-btn"><Paperclip size={20} /></div>
        <div className="message-icon-btn"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23AAAAAA' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'/%3E%3Cpolyline points='17 8 12 3 7 8'/%3E%3Cline x1='12' y1='3' x2='12' y2='15'/%3E%3C/svg%3E" alt="folder" style={{width: 20}} /></div>
        <div className="message-icon-btn"><Camera size={20} /></div>
      </div>
      <div className="message-mic-btn">
        <Mic size={20} />
      </div>
    </div>
  );
};

export default MessageInput;
