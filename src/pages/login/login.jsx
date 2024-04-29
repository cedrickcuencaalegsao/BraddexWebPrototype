import "./login.scss";
import React, { useContext, useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom/cjs/react-router-dom.min";
import { AppContext } from "../../App";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userData, setUserData } = useContext(AppContext);
  const [response, setResponse] = useState("");
  const history = useHistory();

  const LoginApi = async (data) => {
    try {
      // sending data to server.
      const response = await axios.post('http://127.0.0.1:8000/api/login', data);
      // passing auth data to userData
      setUserData(response.data);
      // creating tokens.
      const token = response.data.user.token;
      const isAdmin = response.data.user.isAdmin;
      const id = response.data.user.id;
      // storing token on browser local storage
      localStorage.setItem('token', token);
      localStorage.setItem('isAdmin', isAdmin);
      localStorage.setItem('id', id);
      return true;
    } catch (err) {
      setResponse(err.response.data); //mao ning ang message nga gikan sa API
      // alert(err.response.data);
      console.log(err);
      return;
    }
  }

  const handleLogin = async (ev) => {
    // preventing the page from reloading after submiting data
    ev.preventDefault();

    // data to send into server
    const data = {
      "email": email,
      "password": password
    }
    const status = await LoginApi(data);
    status && history.push('/home');
  }

  return (
    <div className="login">
      <div className="loginContainer">
        <div className="title"><h1>Login</h1></div>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          /><br />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          /><br />
          <input
            type="submit"
            value="Login"
            className="btnSubmit"
          />
        </form>
        <Link to="/register" className="register">Register</Link>
      </div>
    </div>
  );
};

export default Login;
