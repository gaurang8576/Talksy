import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar/Sidebar";
import { useTheme } from "../../context/ThemeContext";
import "./Auth.css";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://api.freeprojectapi.com/api/BusBooking/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: username, password }),
      });

      const data = await response.json();

      // ✅ Fix 1: API returns HTTP 200 even on failure, so also check data.result
      if (!response.ok || data.result === false) {
        setError(data?.message || "Invalid username or password.");
        setLoading(false);
        return;
      }

      // ✅ Fix 2: API nests the user/token inside data.data, not at the top level
      const payload = data?.data;

      if (payload?.token) {
        localStorage.setItem("talksy-token", payload.token);
      }
      if (payload) {
        localStorage.setItem("talksy-user", JSON.stringify(payload));
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
    <div className="auth-page" data-theme={theme}>
      <Sidebar isAuth={true} />

      <main className="auth-main">
        <div className="auth-content">
          <div className="auth-header">
            <h1>Login</h1>
            <p className="auth-subtitle">THE FOCUSED OBSERVER</p>
          </div>

          <div className="auth-card">
            <form onSubmit={handleLogin} noValidate>
              <div className="form-group">
                <label>USERNAME</label>
                <input
                  type="email"
                  placeholder="name@domain.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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