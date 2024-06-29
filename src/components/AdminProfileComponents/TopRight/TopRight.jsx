import "./TopRight.scss";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";

const EditAdminTopRight = (args) => {
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
      <div className="top">
        <div className="title-wrapper">
          <span className="title">Edit Admin personal information</span>
        </div>
        <div className="btn-save-wrapper">
          <SaveIcon className="btn-save" />
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
            <span className="indicator">First Name:</span>
          </div>
          <div className="value-wrapper">
            <input
              type="text"
              className="value"
              name="address"
              value={
                userData.f_name !== null ? userData.f_name : "Update First Name"
              }
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
              name="address"
              value={
                userData.l_name !== null ? userData.l_name : "Update Last Name"
              }
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
              name="address"
              value={userData.email !== null ? userData.email : "Update Emaul"}
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
              name="address"
              value={
                userData.phone !== null ? userData.phone : "Update Phone No."
              }
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditAdminTopRight;
