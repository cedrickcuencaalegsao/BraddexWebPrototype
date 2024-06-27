import "./register.scss";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { generateRandomID } from "../../idgenerator";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const generatedUid = generateRandomID();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [response, setResponse] = useState({}); // Responce variables

  const registerAPI = async (data) => {
    try {
      const API = await axios.post("http://127.0.0.1:8000/api/register", data);
      return API.data;
    } catch (err) {
      console.log(err.response.data);
      setResponse(err.response.data);
    }
  };

  const handleRegister = async (ev) => {
    ev.preventDefault();
    const data = {
      uuid: generatedUid,
      first_name: firstname,
      last_name: lastname,
      email: email,
      password: password,
    };
    const status = await registerAPI(data);
    status && history.push("/");
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const cancelRegistration = () => {
    history.push("/");
  };

  return (
    <div className="form-Register-container">
      <div className="form-Register-container">
        <div className="left">
          <h3 className="title-top">Register an account to.</h3>
          <h1 className="title-center">Become</h1>
          <p className="title-buttom">A member.</p>
        </div>
        <div className="right">
          <div className="title-wrapper">
            <h1 className="title">Register</h1>
          </div>
          <div className="response-container">
            {Object.keys(response).length > 0 && (
              <div>
                {Object.keys(response).map((key) => (
                  <div key={key} style={{ fontSize: "15px", color: "red" }}>
                    {response[key].map((msg) => (
                      <div key={msg}>{msg}</div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
          <form onSubmit={handleRegister}>
            <div className="form-container">
              <div className="items">
                <div className="icon-wrapper">
                  <PersonIcon className="icon" />
                </div>
                <div className="input-wrapper">
                  <input
                    type="text"
                    onChange={(e) => setFirstname(e.target.value)}
                    placeholder="First Name..."
                    className="input"
                  />
                </div>
              </div>
              <div className="items">
                <div className="icon-wrapper">
                  <PersonIcon className="icon" />
                </div>
                <div className="input-wrapper">
                  <input
                    type="text"
                    onChange={(e) => setLastname(e.target.value)}
                    placeholder="Last Name..."
                    className="input"
                  />
                </div>
              </div>
              <div className="items">
                <div className="icon-wrapper">
                  <AlternateEmailIcon className="icon" />
                </div>
                <div className="input-wrapper">
                  <input
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email..."
                    className="input"
                  />
                </div>
              </div>
              <div className="items">
                <div className="icon-wrapper">
                  {showPassword ? (
                    <VisibilityIcon
                      className="icon"
                      onClick={handleShowPassword}
                    />
                  ) : (
                    <VisibilityOffIcon
                      className="icon"
                      onClick={handleShowPassword}
                    />
                  )}
                </div>
                <div className="input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password..."
                    className="input"
                  />
                </div>
              </div>
              <div className="btn-submit-container">
                <input
                  type="submit"
                  value="Register"
                  className="btn-register"
                />
              </div>
            </div>
          </form>
          <div className="btn-cancel-wrapper">
            <button className="btn-cancel" onClick={() => cancelRegistration()}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
