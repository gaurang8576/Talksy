import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Settings from './pages/Settings/Settings';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('talksy-theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('talksy-theme', theme);
  }, [theme]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home theme={theme} setTheme={setTheme} />} />
        <Route path="/settings" element={<Settings theme={theme} setTheme={setTheme} />} />
      </Routes>
    </Router>
  );
}

export default App;
