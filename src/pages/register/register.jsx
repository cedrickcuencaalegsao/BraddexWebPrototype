import "./register.scss";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleRegister = async (ev) => {
    // preventing the page from reloading after submiting data
    ev.preventDefault();
    // data to send into server 
    const data = {
        "first_name": firstname,
        "last_name": lastname,
        "email": email,
        "password": password
    }
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/register', data);
        console.log(response.data);
        history.push('/')
    } catch (err) {
        console.log(err.response.data.error)
    }
  }

  return (
    <div className="formRegister">
      <div className="titl">
        <h1>Register</h1>
      </div>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          onChange={(e) => setFirstname(e.target.value)}
          placeholder="First Name..."
        />
        <br />
        <input
          type="text"
          onChange={(e) => setLastname(e.target.value)}
          placeholder="Last Name..."
        />
        <br />
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email..."
        />
        <br />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password..."
        />
        <br />
        <input type="submit" value="Register" />
      </form>
      <Link to="/">Back</Link>
    </div>
  );
};

export default Register;
