import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar/Sidebar";
import "./Auth.css";

export default function Register({ onLogin }) {
  const navigate = useNavigate();
  // ... state remains same ...
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
          userId: 0,
          userName: form.email,
          emailId: form.email,
          fullName: form.fullName,
          password: form.password,
          mobileNo: "0000000000",
          role: "User",
          projectName: "Talksy",
        }),
      });

      const data = await response.json();

      if (!response.ok || data.result === false) {
        // API returned error status or result is false
        setError(data?.message || data?.title || "Registration failed. Please try again.");
        setLoading(false);
        return;
      }

      // ── Success ──
      setSuccess("Account created! Redirecting to login...");

      // Save token/user if API returns them on register
      if (data?.token) {
        localStorage.setItem("talksy-token", data.token);
        onLogin();       // auto-login if token is returned
        setTimeout(() => navigate("/home"), 1000);
      } else {
        // No token returned — redirect to login manually
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
    <div className="auth-page">
      <Sidebar isAuth={true} />
      {/* Main */}
      <main className="auth-main">

        <div className="auth-content">
          <div className="auth-header">
            <h1>Register</h1>
            <p className="auth-subtitle">Enter the focused workspace of Obsidian Flow.</p>
          </div>

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