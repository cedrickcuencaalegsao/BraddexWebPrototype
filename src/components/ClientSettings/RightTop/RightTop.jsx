import { useEffect, useState } from "react";
import "./RightTop.scss";
import SaveIcon from "@mui/icons-material/Save";
import Switch from "@mui/material/Switch";
import axios from "axios";

const ClientSettingTopRight = (args) => {
  let data = args.data;
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    setUserData(data);
  }, [data]);

  const handleChanges = (e, id) => {
    let key = e.target.name;
    let value = e.target.value;
    // pangita sa index sa object
    const index = data.findIndex((item) => item.id === id);

    // pag nakita e update nato ang object kung wa kay wa, goods?
    if (index !== -1) {
      if (key === "isOnline") {
        const newData = [...data];
        newData[index] = { ...newData[index], [key]: e.target.checked ? 1 : 0 };
        setUserData(newData);
      } else {
        const newData = [...data];
        newData[index] = { ...newData[index], [key]: value };
        setUserData(newData);
      }
    }
  };
  const handleSaveChanges = async () => {
    let data = userData[0];
    try {
      const API = await axios.post(
        "http://127.0.0.1:8000/api/user-settings-update",
        data
      );
      return API.data;
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <div className="settings-top-right">
      <div className="top-section">
        <div className="title-wrapper">
          <span className="title">account details</span>
        </div>
        <div className="button-wrapper">
          <SaveIcon className="btn-save" onClick={() => handleSaveChanges()} />
        </div>
      </div>
      <div className="bottom-section">
        {userData.map((item) => (
          <div className="details" key={item.id}>
            <div className="upper-details-wrapper">
              <div className="left">
                <div className="items">
                  <span className="indicator">First Name</span>
                  <input
                    type="text"
                    name="f_name"
                    className="value"
                    value={item.f_name}
                    onChange={(e) => handleChanges(e, item.id)}
                  ></input>
                </div>
                <div className="items">
                  <span className="indicator">Email</span>
                  <input
                    type="text"
                    name="email"
                    className="value"
                    value={item.email}
                    onChange={(e) => handleChanges(e, item.id)}
                  ></input>
                </div>
                <div className="items">
                  <span className="indicator">Birthday</span>
                  <input
                    type="date"
                    name="birthday"
                    className="value"
                    value={item.birthday}
                    onChange={(e) => handleChanges(e, item.id)}
                  ></input>
                </div>
              </div>
              <div className="right">
                <div className="items">
                  <span className="indicator">Last Name</span>
                  <input
                    type="text"
                    name="l_name"
                    className="value"
                    value={item.l_name}
                    onChange={(e) => handleChanges(e, item.id)}
                  ></input>
                </div>
                <div className="items">
                  <span className="indicator">Phone No.</span>
                  <input
                    type="text"
                    name="phone_no"
                    className="value"
                    value={item.phone_no}
                    onChange={(e) => handleChanges(e, item.id)}
                  ></input>
                </div>
                <div className="items">
                  <span className="indicator">Account Status</span>
                  <div className="switch-wrapper">
                    <div className="item">
                      <div className="indicator">Account Status</div>
                      <Switch
                        name="isOnline"
                        checked={item.isOnline === 1 ? true : false}
                        onChange={(e) => handleChanges(e, item.id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lower-details-wrapper">
              <div className="items">
                <span className="indicator">Address</span>
                <input
                  type="text"
                  name="address"
                  className="value"
                  value={item.address}
                  onChange={(e) => handleChanges(e, item.id)}
                ></input>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ClientSettingTopRight;
