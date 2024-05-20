import "./login.scss";
import React, { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom/cjs/react-router-dom.min";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [email, setEmail] = useState(""); // Email Variables
  const [password, setPassword] = useState(""); // Password variables
  const [response, setResponse] = useState(""); // Responce variables
  const history = useHistory(); // for page navigation.
  const [showPassword, setShowPassword] = useState(false);

  const LoginApi = async (data) => {
    try {
      // sending data to server.
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        data
      );
      // Getting token from the response.
      const token = response.data.data.token;
      const isAdmin = response.data.data.isAdmin;
      const uuid = response.data.data.uuid;
      // storing token, isAdmin, and user ID on browser local storage
      localStorage.setItem("token", token);
      localStorage.setItem("isAdmin", isAdmin);
      localStorage.setItem("uuid", uuid);
      return true; // returning data for the status as true.
    } catch (err) {
      // Error Response from the server.
      setResponse(err.response.data.message);
      return false; // returning data for the status as false.
    }
  };

  const handleLogin = async (ev) => {
    // preventing the page from reloading after submiting data
    ev.preventDefault();
    // data to send into server
    const data = {
      email: email,
      password: password,
    };
    // getting the status of the response
    const status = await LoginApi(data);
    // If status is true navigate to home page
    status && history.push("/home");
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login">
      <div className="loginContainer">
        <div className="left-container">
          <div className="left-messages-container">
            <h3 className="title-top">Nice to see you again.</h3>
            <h1 className="title-center">Welcome Back</h1>
            <p className="title-buttom">This is only a test.</p>
          </div>
        </div>
        <div className="right-container">
          <div className="right-title-container">
            <h3 className="right-title">Login Account</h3>
          </div>
          <div className="response-container">
            <span style={{ fontSize: "15px", color: "white" }}>{response}</span>
          </div>
          <div className="form-container">
            <form onSubmit={handleLogin} className="form-login">
              <div className="email-container">
                <div className="icon-container">
                  <EmailIcon className="email-icon" />
                </div>
                <input
                  className="email-input"
                  type="text"
                  placeholder="example@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="password-container">
                <div className="icon-container">
                  {showPassword ? (
                    <VisibilityIcon
                      className="password-icon"
                      onClick={handleShowPassword}
                    />
                  ) : (
                    <VisibilityOffIcon
                      className="password-icon"
                      onClick={handleShowPassword}
                    />
                  )}
                </div>
                <input
                  className="password-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="login-btn-container">
                <input type="submit" value="Login" className="btnSubmit" />
              </div>
              <Link to="/register" className="register">
                Register new account.
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
