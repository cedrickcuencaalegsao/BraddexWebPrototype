import "./profile.scss";
import ClientSideBar from "../../../components/client/sideBar/client_sidebar";
import ClientNavBar from "../../../components/client/navBar/client_navBar";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ClientUserProfile = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const id = localStorage.getItem("id");
  const history = useHistory();
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

  // Allowing frontend data to be updated at realtime
  const setFname = (value) => {
    setData({ ...data, f_name: value });
  };
  const setLname = (value) => {
    setData({ ...data, l_name: value });
  };
  const setEmail = (value) => {
    setData({ ...data, email: value });
  };
  const setBirthday = (value) => {
    setData({ ...data, birthday: value });
  };
  const setPhone = (value) => {
    setData({ ...data, phone_no: value });
  };
  const setAddress = (value) => {
    setData({ ...data, address: value });
  };

  const updateAPI = async (data) => {
    try {
      const API = await axios.post(
        "http://127.0.0.1:8000/api/updateprofiledetails",
        data
      );
      console.log(API.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  const handleUpadate = async (ev) => {
    ev.preventDefault();
    const status = await updateAPI(data);
    status && history.push("/client-profile");
  };

  const handleSaveProfile = () => {
    console.log("handleSaveProfile");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="profile">
      <ClientSideBar />
      <div className="profileContainer">
        <ClientNavBar />
        <div className="details-container">
          <div className="leftContainers">
            <div className="titleContainer">
              <h1 className="title">Profile</h1>
            </div>
            <div className="details">
              <div className="details-top">
                <div className="profilePic">
                  <img
                    src={`http://127.0.0.1:8000/images/profile/${data.prof_pic}`}
                    alt="image"
                  />
                </div>
              </div>
              <div className="details-bottom">
                <div className="indicator">
                  <p>First Name: </p>
                  <p>Last Name:</p>
                  <p>Birthday: </p>
                  <p>Email: </p>
                  <p>Address: </p>
                  <p>Contact No.: </p>
                </div>
                <div className="value">
                  {data.f_name !== null ? <p>{data.f_name}</p> : <p>null</p>}
                  {data.l_name !== null ? <p>{data.l_name}</p> : <p>null</p>}
                  {data.birthday !== null ? (
                    <p>{data.birthday}</p>
                  ) : (
                    <p>null</p>
                  )}
                  {data.email !== null ? <p>{data.email}</p> : <p>null</p>}
                  {data.address !== null ? <p>{data.address}</p> : <p>null</p>}
                  {data.phone_no !== null ? (
                    <p>{data.phone_no}</p>
                  ) : (
                    <p>null</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="rightContainers">
            <div className="titleContainer">
              <h1 className="title">Details</h1>
            </div>
            <div className="update-details">
              <div className="left">
                <label htmlFor="fname">First Name </label>
                <label htmlFor="lname">Last Name </label>
                <label htmlFor="email">Email </label>
                <label htmlFor="birthday">Birthday </label>
                <label htmlFor="phone">Phone </label>
                <label htmlFor="address">Address </label>
              </div>
              <div className="right">
                <input
                  type="text"
                  id="fname"
                  value={data.f_name}
                  onChange={(e) => setFname(e.target.value)}
                />
                <input
                  type="text"
                  id="lname"
                  onChange={(e) => setLname(e.target.value)}
                  value={data.l_name}
                />
                <input
                  type="date"
                  id="birthday"
                  value={data.birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                />
                <input
                  type="text"
                  id="email"
                  value={data.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="text"
                  id="phone"
                  value={data.phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  type="text"
                  id="address"
                  value={data.address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="action-button-container">
              <div className="btn-update">
                <button onClick={handleUpadate}>Update</button>
              </div>
            </div>
            <div className="update-profile-picture">
              <input type="file" />
              <br />
              <button onClick={handleSaveProfile}>Save Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientUserProfile;
