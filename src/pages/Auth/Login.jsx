import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
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
        // API returned error status (400, 401, etc.)
        setError(data?.message || data?.title || "Invalid email or password.");
        setLoading(false);
        return;
      }

      // ── Success ──
      // Save user data / token if returned
      if (data?.token) {
        localStorage.setItem("talksy-token", data.token);
      }
      if (data?.user || data?.data) {
        localStorage.setItem("talksy-user", JSON.stringify(data?.user || data?.data));
      }

      onLogin();        // update App.jsx auth state
      navigate("/home");    // go to Home

    } catch (err) {
      console.error("Login error:", err);
      setError(err?.message || "Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Main */}
      <main className="auth-main">
        <nav className="auth-nav">
          <a href="#">About</a>
          <a href="#">Support</a>
          <button className="theme-toggle" title="Toggle theme">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </button>
        </nav>

        <div className="auth-content">
          <div className="auth-header">
            <h1>Login</h1>
            <p className="auth-subtitle">THE FOCUSED OBSERVER</p>
          </div>

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