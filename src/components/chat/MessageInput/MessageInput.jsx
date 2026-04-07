import React, { useRef, useState, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { Smile, Camera, X, FileText } from 'lucide-react';
import { SendIcon as Send, PaperClipIcon as PaperClip, MicIcon as Mic } from '../../common/Icons/ChatWindow';
import { useTheme } from '../../../context/ThemeContext';
import './MessageInput.css';

const MessageInput = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { theme } = useTheme();

  // Recording states
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [isRecordingVideo, setIsRecordingVideo] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [stream, setStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const videoPreviewRef = useRef(null);

  // Timer effect
  useEffect(() => {
    let timer;
    if (isRecordingAudio || isRecordingVideo) {
      timer = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(timer);
  }, [isRecordingAudio, isRecordingVideo]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startAudioRecording = async () => {
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setStream(audioStream);
      const recorder = new MediaRecorder(audioStream);
      setMediaRecorder(recorder);
      recorder.start();
      setIsRecordingAudio(true);
      setShowEmojiPicker(false);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Microphone access denied or unavailable.");
    }
  };

  const startVideoRecording = async () => {
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(videoStream);
      if (videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = videoStream;
      }
      const recorder = new MediaRecorder(videoStream);
      setMediaRecorder(recorder);
      recorder.start();
      setIsRecordingVideo(true);
      setShowEmojiPicker(false);
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Camera access denied or unavailable.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setStream(null);
    setMediaRecorder(null);
    setIsRecordingAudio(false);
    setIsRecordingVideo(false);
  };

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

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
      {showEmojiPicker && (
        <div className="emoji-picker-wrapper">
          <EmojiPicker 
            onEmojiClick={handleEmojiClick}
            theme={theme === 'dark' ? 'dark' : 'light'}
            width="100%"
            height={400}
          />
        </div>
      )}
      {isRecordingVideo && (
        <div className="video-recording-preview">
          <video ref={videoPreviewRef} autoPlay muted className="live-video-preview" />
          <div className="video-recording-timer">{formatTime(recordingTime)}</div>
        </div>
      )}

      {isRecordingAudio && (
        <div className="audio-recording-indicator">
          <div className="recording-pulse"></div>
          <div className="audio-recording-timer">Recording... {formatTime(recordingTime)}</div>
          <button className="stop-recording-btn" onClick={stopRecording}>Stop</button>
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
          {!isRecordingAudio && !isRecordingVideo ? (
            <>
              <div 
                className={`message-icon-btn ${showEmojiPicker ? 'active' : ''}`}
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <Smile size={20} />
              </div>
              <input 
                className="message-input-field" 
                placeholder="Message here something" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={() => setShowEmojiPicker(false)}
              />
              <div className="message-icon-btn" onClick={handleFileClick}><PaperClip size={20} /></div>
              <div className="message-icon-btn" onClick={startAudioRecording}><Mic size={20} /></div>
              <div className="message-icon-btn" onClick={startVideoRecording}><Camera size={20} /></div>
            </>
          ) : (
            <div className="recording-active-status">
              {isRecordingAudio ? "Audio Recording in progress..." : "Video Recording in progress..."}
              {isRecordingVideo && <button className="stop-recording-btn" onClick={stopRecording}>Stop Recording</button>}
            </div>
          )}
        </div>
        <div className="message-send-btn" onClick={isRecordingAudio || isRecordingVideo ? stopRecording : undefined}>
          <Send size={20} />
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
