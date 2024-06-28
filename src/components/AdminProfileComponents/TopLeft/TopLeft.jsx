import "./TopLeft.scss";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect, useState } from "react";

const EditAdminTopLeft = (args) => {
  const data = args.data;
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setUserData(data);
      setLoading(false);
    }
  }, [data]);

  return (
    <div className="edit-admin-top-left">
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
      <div className="background-image-wrapper">
        <img
          src={`http://127.0.0.1:8000/images/profile/${userData.image}`}
          alt="preview"
          className="background-image"
        />
      </div>
      <div className="image-wrapper">
        <img
          src={`http://127.0.0.1:8000/images/profile/${userData.image}`}
          alt="preview"
          className="image"
        />
      </div>
      <div
        className={`status-wrapper ${
          userData.status === 1 ? "online" : "offline"
        }`}
      >
        <span className="satus">
          {userData.status === 1 ? "Online" : "Offline"}
        </span>
      </div>
      <div className="name-wrapper">
        <span className="name">{`${userData.f_name} ${userData.l_name}`}</span>
        <span className="userID">{userData.userID}</span>
      </div>
      <div className="email-wrapper">
        <span className="email">{userData.email}</span>
      </div>
    </div>
  );
};
export default EditAdminTopLeft;
