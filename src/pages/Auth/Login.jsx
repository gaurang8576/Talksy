import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import Sidebar from "../../components/layout/Sidebar/Sidebar";
import { useTheme } from "../../context/ThemeContext";
import "./Auth.css";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://api.freeprojectapi.com/api/BusBooking/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.message || data?.title || "Invalid email or password.");
        setLoading(false);
        return;
      }

      if (data?.token) {
        localStorage.setItem("talksy-token", data.token);
      }
      if (data?.user || data?.data) {
        localStorage.setItem("talksy-user", JSON.stringify(data?.user || data?.data));
      }

      onLogin();
      navigate("/home");

    } catch (err) {
      console.error("Login error:", err);
      setError(err?.message || "Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // ✅ data-theme on the root element so Auth.css can scope all children
    <div className="auth-page" data-theme={theme}>
      <Sidebar isAuth={true} />

      <main className="auth-main">
        <nav className="auth-nav">
          <button 
            className="theme-toggle" 
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </nav>

        <div className="auth-content">
          <div className="auth-header">
            <h1>Login</h1>
            <p className="auth-subtitle">THE FOCUSED OBSERVER</p>
          </div>

          {/*
            ✅ No data-theme here — it inherits from .auth-page above.
            ✅ Removed the bogus <sidebar-theme-toggle> element.
          */}
          <div className="auth-card">
            <form onSubmit={handleLogin} noValidate>
              <div className="form-group">
                <label>EMAIL ADDRESS</label>
                <input
                  type="email"
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>

              <div className="form-group">
                <div className="label-row">
                  <label>PASSWORD</label>
                  <a href="#" className="forgot-link">Forgot Password?</a>
                </div>
                <input
                  type="password"
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>

              {error && <p className="auth-error">{error}</p>}

              <div className="checkbox-row">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  <span className="custom-checkbox"></span>
                  Remember Me
                </label>
              </div>

              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? (
                  <span className="btn-loading">
                    <span className="spinner"></span> Signing in...
                  </span>
                ) : (
                  <>Sign In &rarr;</>
                )}
              </button>
            </form>

            <p className="auth-switch">
              New to the flow?{" "}
              <span onClick={() => navigate("/register")}>Join the Observer</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}