import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const res = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login Successful");

      navigate("/feed");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>ConnectHub</h1>

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <button onClick={handleLogin}>
        Login
      </button>

      <p>
        Don't have an account?
        <Link to="/signup"> Signup</Link>
      </p>
    </div>
  );
}

export default Login;
