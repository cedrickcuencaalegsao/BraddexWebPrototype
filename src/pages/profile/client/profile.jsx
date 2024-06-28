import "./profile.scss";
import ClientSideBar from "../../../components/client/sideBar/client_sidebar";
import ClientNavBar from "../../../components/client/navBar/client_navBar";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";

const ClientUserProfile = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [preview, setPreview] = useState(null);
  const uuid = localStorage.getItem("uuid");
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/profile/${uuid}`
        );
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };
    fetchData();
  }, [uuid]);

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

  const previewPicture = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };
  const updateAPI = async (data) => {
    try {
      const API = await axios.post(
        "http://127.0.0.1:8000/api/updateprofiledetails",
        data
      );
      setLoading(false);
      return API.data;
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

  const saveProfileAPI = async () => {
    try {
      const formData = new FormData();
      formData.append("uuid", uuid);
      formData.append("image", profilePicture);
      const API = await axios.post(
        "http://127.0.0.1:8000/api/updateprofilepicture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResponse(API.data.message);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSaveProfile = async (ev) => {
    ev.preventDefault();
    console.log(uuid);
    try {
      const response = await saveProfileAPI();
      response && history.push("/client-profile");
    } catch (error) {
      console.log(error);
    }
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
                    alt="profilePicture"
                  />
                </div>
              </div>
              <div className="details-bottom">
                <div className="profile-details">
                  <div className="name">
                    {data.f_name !== null ? (
                      <span>{data.f_name}</span>
                    ) : (
                      <span>null</span>
                    )}
                    {data.l_name !== null ? (
                      <span> {data.l_name}</span>
                    ) : (
                      <span>null</span>
                    )}
                  </div>
                  <div className="email">
                    {data.email !== null ? (
                      <span>{data.email}</span>
                    ) : (
                      <span>null</span>
                    )}
                  </div>
                  <div className="address">
                    {data.address !== null ? (
                      <span>{data.address}</span>
                    ) : (
                      <span>null</span>
                    )}
                  </div>
                  <div className="phone">
                    {data.phone_no !== null ? (
                      <span>{data.phone_no}</span>
                    ) : (
                      <span>null</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rightContainers">
            <div className="titleContainer">
              <h1 className="title">Details</h1>
            </div>
            <div className="response-container">
              <span style={{ fontSize: "15px", color: "Green" }}>
                {response}
              </span>
            </div>
            <div className="update-details">
              <div className="left">
                <div className="items">
                  <label htmlFor="fname">First Name </label>
                </div>
                <div className="items">
                  <label htmlFor="lname">Last Name </label>
                </div>
                <div className="items">
                  <label htmlFor="email">Email </label>
                </div>
                <div className="items">
                  <label htmlFor="birthday">Birthday </label>
                </div>
                <div className="items">
                  <label htmlFor="phone">Phone </label>
                </div>
                <div className="items">
                  <label htmlFor="address">Address </label>
                </div>
              </div>
              <div className="right">
                <div className="items">
                  <input
                    type="text"
                    id="fname"
                    value={data.f_name}
                    onChange={(e) => setFname(e.target.value)}
                  />
                </div>
                <div className="items">
                  <input
                    type="text"
                    id="lname"
                    onChange={(e) => setLname(e.target.value)}
                    value={data.l_name}
                  />
                </div>
                <div className="items">
                  <input
                    type="text"
                    id="email"
                    value={data.email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="items">
                  <input
                    type="date"
                    id="birthday"
                    value={data.birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                </div>
                <div className="items">
                  <input
                    type="text"
                    id="phone"
                    value={data.phone_no}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="items">
                  <input
                    type="text"
                    id="address"
                    value={data.address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="action-button-container">
              <div className="btn-update">
                <button onClick={handleUpadate}>Save Details</button>
              </div>
            </div>
            <div className="update-profile-picture">
              <div className="file-input-container">
                <div className="items">
                  <input type="file" onChange={previewPicture} />
                  <span>
                    <AddAPhotoOutlinedIcon />
                  </span>
                </div>
                <div className="items">
                  <div className="btn-save">
                    <button onClick={handleSaveProfile}>Save Profile</button>
                  </div>
                </div>
              </div>
              <div className="preview">
                {preview ? (
                  <img src={preview} alt="preview" />
                ) : (
                  <span>No preview available</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientUserProfile;
