import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Settings from './pages/Settings/Settings';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// ── Auth Guard ──────────────────────────────────────────────
// Wraps protected routes. If not logged in → redirect to /login
function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// ── Auth Route Guard ────────────────────────────────────────
// If already logged in and tries to visit /login or /register → automatically log out
function AuthRoute({ isLoggedIn, children }) {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoggedIn) {
      console.log('🔄 AuthRoute detected logged-in state on auth page → redirecting to /home');
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

  return children;
}

// ────────────────────────────────────────────────────────────

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const authStatus = localStorage.getItem('talksy-auth') === 'true';
    console.log('=== Talksy App - Auth Status:', authStatus, '===');
    if (!authStatus) {
      console.log('ℹ️  Not logged in → Login page should display');
    } else {
      console.log('ℹ️  Logged in → Home page should display');
    }
    console.log('💡 Press Ctrl+Alt+R to reset authentication');
    return authStatus;
  });

  // Debug: Allow Ctrl+Alt+R to reset auth state
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.altKey && e.key === 'r') {
        console.log('🔄 Resetting auth state...');
        localStorage.removeItem('talksy-auth');
        localStorage.removeItem('talksy-token');
        localStorage.removeItem('talksy-user');
        setIsLoggedIn(false);
        alert('✓ Auth state cleared! Redirecting to login...');
        window.location.href = '/login';
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleLogin = () => {
    localStorage.setItem('talksy-auth', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('talksy-auth');
    localStorage.removeItem('talksy-token');
    localStorage.removeItem('talksy-user');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>

        {/* ── Auth Pages (only accessible when NOT logged in) ── */}
        <Route
          path="/login"
          element={
            <AuthRoute isLoggedIn={isLoggedIn}>
              <Login onLogin={handleLogin} />
            </AuthRoute>
          }
        />
        <Route
          path="/register"
          element={
            <AuthRoute isLoggedIn={isLoggedIn}>
              <Register onLogin={handleLogin} />
            </AuthRoute>
          }
        />

        {/* ── Protected Pages (only accessible when logged in) ── */}
        <Route
          path="/home"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Home onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Settings onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />

        {/* ── Root: redirect to /home if logged in, else /login ── */}
        <Route
          path="/"
          element={<Navigate to={isLoggedIn ? "/home" : "/login"} replace />}
        />

        {/* ── Fallback: unknown paths ── */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/login"} replace />} />

      </Routes>
    </Router>
  );
}

export default App;