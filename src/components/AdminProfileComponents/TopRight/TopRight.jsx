import "./TopRight.scss";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const EditAdminTopRight = (args) => {
  const data = args.data;
  const uuid = localStorage.getItem("uuid");
  const history = useHistory();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState({});

  useEffect(() => {
    if (data) {
      setUserData(data);
      setLoading(false);
    }
  }, [data]);

  const onChangeValue = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    setUserData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const saveChangesAPI = async (args) => {
    if (args) {
      try {
        const API = await axios.post(
          "http://127.0.0.1:8000/api/update-admin-pers-info",
          args
        );
        return API.data;
      } catch (error) {
        setMessages(error.response.data.error);
        console.log(error.response.data.error);
      }
    }
  };

  const saveChanges = async () => {
    let data = {
      uuid: uuid,
      first_name: userData.f_name,
      last_name: userData.l_name,
      email: userData.email,
      phone_no: userData.phone,
      address: userData.address,
    };
    const status = await saveChangesAPI(data);
    status && history.push("/profile");
  };

  return (
    <div className="edit-admin-top-left">
      <div className="top">
        <div className="title-wrapper">
          <span className="title">Edit Admin personal information</span>
        </div>
        <div className="btn-save-wrapper">
          <SaveIcon className="btn-save" onClick={() => saveChanges()} />
        </div>
      </div>
      <div className="progress">
        {loading ? (
          <div className="loading">
            <LinearProgress
              sx={{
                bgcolor: "lightgray",
                "& .MuiLinearProgress-bar": { bgcolor: "orangered" },
              }}
            />
          </div>
        ) : (
          <div className="loading"></div>
        )}
      </div>
      <div className="response-container">
        {Object.keys(messages).length > 0 && (
          <div>
            {Object.keys(messages).map((key) => (
              <div key={key} style={{ fontSize: "15px", color: "red" }}>
                {messages[key].map((msg) => (
                  <div key={msg}>{msg}</div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bottom">
        <div className="items">
          <div className="indicator-wrapper">
            <span className="indicator">First Name:</span>
          </div>
          <div className="value-wrapper">
            <input
              type="text"
              className="value"
              name="f_name"
              value={
                userData.f_name !== null ? userData.f_name : "Update First Name"
              }
              onChange={onChangeValue}
            />
          </div>
        </div>
        <div className="items">
          <div className="indicator-wrapper">
            <span className="indicator">Last Name:</span>
          </div>
          <div className="value-wrapper">
            <input
              type="text"
              className="value"
              name="l_name"
              value={
                userData.l_name !== null ? userData.l_name : "Update Last Name"
              }
              onChange={onChangeValue}
            />
          </div>
        </div>
        <div className="items">
          <div className="indicator-wrapper">
            <span className="indicator">Email</span>
          </div>
          <div className="value-wrapper">
            <input
              type="text"
              className="value"
              name="email"
              value={userData.email !== null ? userData.email : "Update Email"}
              onChange={onChangeValue}
            />
          </div>
        </div>
        <div className="items">
          <div className="indicator-wrapper">
            <span className="indicator">Phone No.</span>
          </div>
          <div className="value-wrapper">
            <input
              type="text"
              className="value"
              name="phone"
              value={
                userData.phone !== null ? userData.phone : "Update Phone No."
              }
              onChange={onChangeValue}
            />
          </div>
        </div>
        <div className="items">
          <div className="indicator-wrapper">
            <span className="indicator">Address</span>
          </div>
          <div className="value-wrapper">
            <input
              type="text"
              className="value"
              name="address"
              value={
                userData.address !== null ? userData.address : "Update Address"
              }
              onChange={onChangeValue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditAdminTopRight;
