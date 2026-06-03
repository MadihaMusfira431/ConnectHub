// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import API from "../services/api";

// function Login() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleLogin = async () => {
//     try {
//       const res = await API.post(
//         "/auth/login",
//         formData
//       );

//       localStorage.setItem(
//         "user",
//         JSON.stringify(res.data.user)
//       );

//       alert("Login Successful");

//       navigate("/feed");
//     } catch (error) {
//       alert(error.response.data.message);
//     }
//   };

//   return (
//     <div>
//       <h1>ConnectHub</h1>

//       <input
//         name="email"
//         placeholder="Email"
//         onChange={handleChange}
//       />

//       <input
//         name="password"
//         type="password"
//         placeholder="Password"
//         onChange={handleChange}
//       />

//       <button onClick={handleLogin}>
//         Login
//       </button>

//       <p>
//         Don't have an account?
//         <Link to="/signup"> Signup</Link>
//       </p>
//     </div>
//   );
// }

// export default Login;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return toast.error("Fill in all fields");
    setLoading(true);
    const result = await login(form.email, form.password);
    setLoading(false);
    if (result.success) {
      toast.success("Welcome back! 👋");
      navigate("/feed");
    } else {
      toast.error(result.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="grid-overlay" />
      </div>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-logo">
            <div className="logo-icon">✦</div>
            <span className="logo-text">pulse</span>
          </div>

          <div className="auth-header">
            <h1>Welcome back</h1>
            <p>Sign in to your feed</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="field-group">
              <label>Email</label>
              <div className="input-wrap">
                <span className="input-icon">@</span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="field-group">
              <label>Password</label>
              <div className="input-wrap">
                <span className="input-icon">🔒</span>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? "👁️" : "🙈"}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? (
                <span className="btn-loading">
                  <span className="spinner" />
                  Signing in…
                </span>
              ) : (
                "Sign In →"
              )}
            </button>
          </form>

          <p className="auth-footer">
            No account?{" "}
            <Link to="/signup" className="auth-link">
              Create one
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .auth-page {
          min-height: 100vh;
          background: #0a0a0f;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .auth-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.35;
        }
        .orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, #7c3aed, transparent);
          top: -100px; left: -100px;
          animation: drift 8s ease-in-out infinite alternate;
        }
        .orb-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, #06b6d4, transparent);
          bottom: -80px; right: -80px;
          animation: drift 10s ease-in-out infinite alternate-reverse;
        }
        .orb-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, #f472b6, transparent);
          top: 40%; left: 40%;
          animation: drift 6s ease-in-out infinite alternate;
        }

        @keyframes drift {
          from { transform: translate(0, 0) scale(1); }
          to { transform: translate(30px, 20px) scale(1.08); }
        }

        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        .auth-container {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 420px;
          padding: 24px;
        }

        .auth-card {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 0 60px rgba(124,58,237,0.15);
          animation: fadeUp 0.5s ease;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .auth-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 32px;
        }

        .logo-icon {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #7c3aed, #06b6d4);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: white;
        }

        .logo-text {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.5px;
        }

        .auth-header {
          margin-bottom: 28px;
        }

        .auth-header h1 {
          font-family: 'Syne', sans-serif;
          font-size: 26px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.5px;
          margin-bottom: 6px;
        }

        .auth-header p {
          font-size: 14px;
          color: rgba(255,255,255,0.45);
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .field-group label {
          display: block;
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 8px;
        }

        .input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          font-size: 14px;
          color: rgba(255,255,255,0.3);
          pointer-events: none;
          line-height: 1;
        }

        .input-wrap input {
          width: 100%;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 13px 42px 13px 42px;
          font-size: 14px;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          transition: border-color 0.2s, background 0.2s;
          outline: none;
        }

        .input-wrap input::placeholder { color: rgba(255,255,255,0.25); }

        .input-wrap input:focus {
          border-color: rgba(124,58,237,0.7);
          background: rgba(124,58,237,0.1);
        }

        .eye-btn {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 14px;
          padding: 4px;
          opacity: 0.5;
          transition: opacity 0.2s;
        }
        .eye-btn:hover { opacity: 1; }

        .btn-primary {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #7c3aed, #5b21b6);
          border: none;
          border-radius: 12px;
          color: #fff;
          font-size: 15px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
          letter-spacing: 0.2px;
          margin-top: 4px;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(124,58,237,0.4);
        }

        .btn-primary:active:not(:disabled) { transform: scale(0.98); }
        .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

        .btn-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .auth-footer {
          text-align: center;
          margin-top: 24px;
          font-size: 13px;
          color: rgba(255,255,255,0.35);
        }

        .auth-link {
          color: #a78bfa;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        .auth-link:hover { color: #c4b5fd; }

        @media (max-width: 480px) {
          .auth-card { padding: 28px 24px; }
        }
      `}
      </style>
    </div>
  );
}