/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { GrGithub, GrGoogle, GrLinkedin } from "react-icons/gr";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      // Send the login request to the backend
      const response = await axios.post("http://localhost:8080/api/register", {
        email: email, // Using email as username
        password: password,
        username: username  
      });

      localStorage.setItem("token", response.data.token);
      setLoading(false);
      navigate("/home"); // Redirect to home page after login
    } catch (err) {
      setLoading(false);
      if (err.response) {
        setError(err.response.data.message || "Login failed. Please try again.");
      } else {
        setError("Network error. Please try again later.");
      }
    }
  };
  return (
    <>
      <div className="form-main flex">
        <div className="background flex">
          <img src="/bg.jpg" alt="" />
        </div>
        <div className="login-form flex">
          <div className="form-inputs flex col">
            <h1>Join Us!</h1>
            <p>Please Register To Continue!</p>
            <div className="input-wrap flex" style={{ marginTop: "20px" }}>
              <input type="text" placeholder="Username..." value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="input-wrap flex">
              <input type="text" placeholder="Email Address..." value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input-wrap flex">
              <input type="password" placeholder="Password..."  value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <button onClick={handleLogin}>Register</button>
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
              <button
                className="register-btn flex"
                onClick={() => navigate("/")}
              >
                login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
