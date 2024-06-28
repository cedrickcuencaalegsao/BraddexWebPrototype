import "./BottomLeft.scss";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import Switch from "@mui/material/Switch";

const EditAdminBottomLeft = (args) => {
  const data = args.data;
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setUserData(data);
      setLoading(false);
    }
  }, [data]);

  const handleSaveChanges = () => {
    console.log(userData);
  };

  console.log(userData);

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
