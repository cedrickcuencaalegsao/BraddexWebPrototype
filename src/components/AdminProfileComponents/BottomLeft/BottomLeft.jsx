import "./BottomLeft.scss";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import Switch from "@mui/material/Switch";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const EditAdminBottomLeft = (args) => {
  const data = args.data;
  let uuid = localStorage.getItem("uuid");
  const history = useHistory();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setUserData(data);
      setLoading(false);
    }
  }, [data]);

  const onSwitch = (args) => {
    const updateValue = (params) => {
      if (params === 0) {
        return 1;
      }
      return 0;
    };
    setUserData((prev) => {
      const newValue = updateValue(prev[args]);
      return {
        ...prev,
        [args]: newValue,
      };
    });
  };

  const saveChangeAPI = async (args) => {
    try {
      const API = await axios.post(
        "http://127.0.0.1:8000/api/update-account-state",
        args
      );
      console.log(API.data);
      return API.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveChanges = async () => {
    let data = {
      uuid: uuid,
      isActive: userData.isActive,
      isOnline: userData.isOnline,
      isAdmin: userData.isAdmin,
    };
    const status = await saveChangeAPI(data);
    status && history.push("/profile");
  };

  return (
    <div className="edit-admin-bottom-left">
      <div className="top">
        <div className="title-wrapper">
          <span className="title">Edit Account State</span>
        </div>
        <div className="save-icon-wrapper">
          <SaveIcon className="btn-save" onClick={() => handleSaveChanges()} />
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
      <div className="bottom">
        <div className="items">
          <div className="indicator-wrapper">
            <span className="indicator">Active Account</span>
          </div>
          <div className="switch-wrapper">
            <Switch
              className="switch"
              checked={userData.isActive === 1 ? true : false}
              onChange={() => onSwitch("isActive")}
            />
          </div>
        </div>
        <div className="items">
          <div className="indicator-wrapper">
            <span className="indicator">Status</span>
          </div>
          <div className="switch-wrapper">
            <Switch
              className="switch"
              checked={userData.isOnline === 1 ? true : false}
              onChange={() => onSwitch("isOnline")}
            />
          </div>
        </div>
        <div className="items">
          <div className="indicator-wrapper">
            <span className="indicator">Admin</span>
          </div>
          <div className="switch-wrapper">
            <Switch
              className="switch"
              checked={userData.isAdmin === 1 ? true : false}
              disabled={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditAdminBottomLeft;
