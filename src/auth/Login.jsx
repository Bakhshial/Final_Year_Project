import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import { GrGithub, GrGoogle, GrLinkedin } from "react-icons/gr";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        email, // Using email for login
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      } else {
        setError("Unexpected response from server.");
      }
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Invalid email or password.");
      } else {
        setError("Network error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-main flex">
      <div className="background flex">
        <img src="/bg.jpg" alt="" />
      </div>
      <div className="login-form flex">
        <div className="form-inputs flex col">
          <h1>Welcome</h1>
          <p>Please Login To Continue!</p>
          <form onSubmit={handleLogin}>
            <div className="input-wrap flex" style={{ marginTop: "20px" }}>
              <input
                type="email"
                placeholder="Email Address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-wrap flex" style={{ marginTop: "20px" }}>
              <input
                type="password"
                placeholder="Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            
            <Link className="link" to={"/"} style={{margin: "20px" }}>
                Forgot Password?
            </Link>
            <p style={{ marginTop: "20px" }}></p>
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="text flex">
            <p>OR</p>
          </div>
          <div className="icons flex">
            <div className="icon flex">
              <GrGoogle />
            </div>
            <div className="icon flex">
              <GrGithub />
            </div>
            <div className="icon flex">
              <GrLinkedin />
            </div>
          </div>
          <button
            className="register-btn flex"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
          <p style={{ marginTop: "20px" }}>
            or login as a{" "}
            <Link style={{ color: "rgba(255,255,255,0.8)" }} to={"/home"}>
              Guest
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
