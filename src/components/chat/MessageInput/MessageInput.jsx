import React, { useRef, useState } from 'react';
import { Smile, Camera, X, FileText } from 'lucide-react';
import { SendIcon as Send, PaperClipIcon as PaperClip, MicIcon as Mic } from '../../common/Icons/ChatWindow';
import './MessageInput.css';

const MessageInput = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  return (
    <div className="message-outer-container">
      {selectedFile && (
        <div className="file-preview-area">
          <div className="preview-card">
            {previewUrl ? (
              <img src={previewUrl} alt="preview" className="file-preview-img" />
            ) : (
              <div className="file-preview-icon">
                <FileText size={24} />
                <span className="file-name-text">{selectedFile.name}</span>
              </div>
            )}
            <button className="preview-clear-btn" onClick={clearFile}>
              <X size={14} />
            </button>
          </div>
        </div>
      )}
      <div className="message-input-container">
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          onChange={handleFileChange}
        />
        <div className="message-input-wrapper">
          <div className="message-icon-btn"><Smile size={20} /></div>
          <input 
            className="message-input-field" 
            placeholder="Message here something" 
          />
          <div className="message-icon-btn" onClick={handleFileClick}><PaperClip size={20} /></div>
          <div className="message-icon-btn"><Mic size={20} /></div>
          <div className="message-icon-btn"><Camera size={20} /></div>
        </div>
        <div className="message-send-btn">
          <Send size={20} />
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
