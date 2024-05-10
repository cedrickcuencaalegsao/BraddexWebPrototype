import "./profile.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PhotoCameraRoundedIcon from "@mui/icons-material/PhotoCameraRounded";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ClientUserProfile = () => {
  const [data, setData] = useState({});
  const [fname, setFname] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();
  const id = localStorage.getItem("id");
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/profile/${id}`
      );
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(data);

  const handleBack = () => {
    history.push("/client-home");
  };

  const isEditable = () => {
    return true; // Always return true
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="profile">
      <div className="profileContainer">
        <div className="leftContainers">
          <div className="titleContainer">
            <h1 className="title">Details</h1>
          </div>
          <div className="details">
            <div className="left-items">
              <div className="profilePic">
                <img src="#" alt="image" />
              </div>
            </div>
            <div className="left-items">
              <p className="indicator">First Name: </p>
              <span>{data.f_name}</span>
            </div>
            <div className="left-items">
              <p className="indicator">Last Name:</p>
              <span>{data.l_name}</span>
            </div>
            <div className="left-items">
              <p className="indicator">Birthday: </p>
              <span>{data.birthday}</span>
            </div>
            <div className="left-items">
              <p className="indicator">Email: </p>
              <span>{data.email}</span>
            </div>
            <div className="left-items">
              <p className="indicator">Address: </p>
              <span>{data.address}</span>
            </div>
            <div className="left-items">
              <p className="indicator">Contact No.: </p>
              <span>{data.phone}</span>
            </div>
          </div>
        </div>
        <div className="rightContainers">
          <h1 className="title">Profile</h1>
          <div className="center-right">
            <div className="left">
              <div className="center-right-item">
                <label htmlFor="fname">First Name </label>
                <input type="text" onChange={(e) => setFname(e.target.value)} />
              </div>
              <div className="center-right-item">
                <label htmlFor="fname">Last Name </label>
                <input type="text" placeholder={data.l_name} />
              </div>
              <div className="center-right-item">
                <label htmlFor="fname">Birthday </label>
                <input type="date" placeholder={data.birthday} />
              </div>
            </div>
            <div className="right">
            <div className="center-right-item">
                <label htmlFor="fname">Email </label>
                <input type="text" onChange={(e) => setFname(e.target.value)} />
              </div>
              <div className="center-right-item">
                <label htmlFor="fname">Phone </label>
                <input type="text" onChange={(e) => setFname(e.target.value)} />
              </div>
              <div className="center-right-item">
                <label htmlFor="fname">Address </label>
                <input type="text" onChange={(e) => setFname(e.target.value)} />
              </div>
            </div>
          </div>
          <div className="bottom-right">
            <div className="actions" onClick={handleBack}>
              <HomeRoundedIcon />
            </div>
            <div className="actions">
              <PhotoCameraRoundedIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientUserProfile;
