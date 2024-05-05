import "./login.scss";
import React, { useContext, useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom/cjs/react-router-dom.min";

const Login = () => {
  const [email, setEmail] = useState(""); // Email Variables
  const [password, setPassword] = useState(""); // Password variables
  const [response, setResponse] = useState(""); // Responce variables
  const history = useHistory(); // for page navigation

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
      const id = response.data.data.id;
      // storing token, isAdmin, and user ID on browser local storage
      localStorage.setItem("token", token);
      localStorage.setItem("isAdmin", isAdmin);
      localStorage.setItem("id", id);
      return true;
    } catch (err) {
      // Error Response from the server.
      setResponse(err.response.data.message);
      return;
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

  return (
    <div className="login">
      <div className="loginContainer">
        <div className="title">
          <h1>Login</h1>
        </div>
        <span style={{ fontSize: "15px", color: "red" }}>{response}</span>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <input type="submit" value="Login" className="btnSubmit" />
        </form>
        <Link to="/register" className="register">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
