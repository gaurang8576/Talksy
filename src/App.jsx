// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home/Home';
// import Settings from './pages/Settings/Settings';

// function App() {
//   const [theme, setTheme] = useState(() => {
//     return localStorage.getItem('talksy-theme') || 'dark';
//   });

//   useEffect(() => {
//     document.documentElement.setAttribute('data-theme', theme);
//     localStorage.setItem('talksy-theme', theme);
//   }, [theme]);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home theme={theme} setTheme={setTheme} />} />
//         <Route path="/settings" element={<Settings theme={theme} setTheme={setTheme} />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
// If already logged in and tries to visit /login or /register → redirect to home
function AuthRoute({ isLoggedIn, children }) {
  if (isLoggedIn) {
    return <Navigate to="/home" replace />;
  }
  return children;
}

// ────────────────────────────────────────────────────────────

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('talksy-theme') || 'dark';
  });

  // Check if user is already logged in (persisted in localStorage)
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

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('talksy-theme', theme);
  }, [theme]);

  // Call this from Login.jsx after successful login
  const handleLogin = () => {
    localStorage.setItem('talksy-auth', 'true');
    setIsLoggedIn(true);
  };

  // Call this from anywhere to log out
  const handleLogout = () => {
    localStorage.removeItem('talksy-auth');
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
              <Home theme={theme} setTheme={setTheme} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Settings theme={theme} setTheme={setTheme} onLogout={handleLogout} />
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