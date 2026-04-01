import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar/Sidebar';
import ChatList from '../../components/layout/ChatList/ChatList';
import ChatWindow from '../../components/chat/ChatWindow/ChatWindow';
import './Home.css';

const Home = ({ theme, setTheme, onLogout }) => {
  const [activeChat, setActiveChat] = useState(null);

  return (
    <div className="home-container">
      <Sidebar onHomeClick={() => setActiveChat(null)} theme={theme} setTheme={setTheme} onLogout={onLogout} />
      <ChatList onChatSelect={setActiveChat} activeChatId={activeChat?.id} />
      <ChatWindow activeChat={activeChat} />
    </div>
  );
};

export default Home;
