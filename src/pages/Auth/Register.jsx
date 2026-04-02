import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import Sidebar from "../../components/layout/Sidebar/Sidebar";
import { useTheme } from "../../context/ThemeContext";
import "./Auth.css";

export default function Register({ onLogin }) {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme(); // ✅ consume theme from context
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirm: "",
    terms: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.fullName || !form.email || !form.password || !form.confirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (!form.terms) {
      setError("Please accept the Terms of Service.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://api.freeprojectapi.com/api/BusBooking/AddNewUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.message || data?.title || "Registration failed. Please try again.");
        setLoading(false);
        return;
      }

      setSuccess("Account created! Redirecting to login...");

      if (data?.token) {
        localStorage.setItem("talksy-token", data.token);
        onLogin();
        setTimeout(() => navigate("/home"), 1000);
      } else {
        setTimeout(() => navigate("/login"), 1500);
      }

    } catch (err) {
      console.error("Registration error:", err);
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
            <h1>Register</h1>
            <p className="auth-subtitle">Enter the focused workspace of Obsidian Flow.</p>
          </div>

          {/* ✅ No data-theme here — inherits from .auth-page above */}
          <div className="auth-card">
            <form onSubmit={handleRegister} noValidate>
              <div className="form-group">
                <label>FULL NAME</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Elias Vance"
                  value={form.fullName}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </div>

              <div className="form-group">
                <label>EMAIL ADDRESS</label>
                <input
                  type="email"
                  name="email"
                  placeholder="vance@obsidian.flow"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>PASSWORD</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />
                </div>
                <div className="form-group">
                  <label>CONFIRM</label>
                  <input
                    type="password"
                    name="confirm"
                    placeholder="••••••••"
                    value={form.confirm}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />
                </div>
              </div>

              {error && <p className="auth-error">{error}</p>}
              {success && <p className="auth-success">{success}</p>}

              <div className="checkbox-row">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={form.terms}
                    onChange={handleChange}
                  />
                  <span className="custom-checkbox"></span>
                  I accept the{" "}
                  <a href="#" className="terms-link">Terms of Service</a>
                </label>
              </div>

              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? (
                  <span className="btn-loading">
                    <span className="spinner"></span> Creating...
                  </span>
                ) : (
                  "CREATE ACCOUNT"
                )}
              </button>
            </form>

            <p className="auth-switch">
              <span onClick={() => navigate("/login")}>← Back to Login</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}