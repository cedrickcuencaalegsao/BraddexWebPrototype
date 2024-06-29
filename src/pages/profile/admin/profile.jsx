import "./profile.scss";
import SideBar from "../../../components/sideBar/side_bar";
import NavBar from "../../../components/navBar/nav_bar";
import { useEffect, useState } from "react";
import axios from "axios";
import { LinearProgress } from "@mui/material";
// importing components.
import EditAdminTopLeft from "../../../components/AdminProfileComponents/TopLeft/TopLeft";
import EditAdminBottomLeft from "../../../components/AdminProfileComponents/BottomLeft/BottomLeft";
import EditAdminTopRight from "../../../components/AdminProfileComponents/TopRight/TopRight";
import EditAdminBottomRight from "../../../components/AdminProfileComponents/ButtomRight/BottomRight";

const AdminProfile = () => {
  const uuid = localStorage.getItem("uuid");
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const API = await axios.get(
          `http://127.0.0.1:8000/api/profile/${uuid}`
        );
        setUserData(API.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (uuid) {
      getUserData();
    }
  }, [uuid]);

  const top_left_data = () => {
    if (userData.id) {
      return {
        f_name: userData.f_name,
        l_name: userData.l_name,
        userID: userData.userID,
        email: userData.email,
        status: userData.isOnline,
        image: userData.prof_pic,
      };
    }
  };

  const bottom_left_data = () => {
    if (userData.id) {
      return {
        isAdmin: userData.isAdmin,
        isOnline: userData.isOnline,
        isActive: userData.isActive,
      };
    }
  };

  const top_right_data = () => {
    if (userData.id) {
      return {
        f_name: userData.f_name,
        l_name: userData.l_name,
        email: userData.email,
        phone: userData.phone_no,
        address: userData.address,
      };
    }
  };

  const bottom_right_data = () => {
    if (userData.id) {
      return {
        image: userData.prof_pic,
      };
    }
  };

  return (
    <div className="admin-profile">
      <SideBar />
      <div className="admin-profile-Container">
        <NavBar />
        <div className="content">
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
          <div className="left">
            <EditAdminTopLeft data={top_left_data()} />
            <EditAdminBottomLeft data={bottom_left_data()} />
          </div>
          <div className="right">
            <EditAdminTopRight data={top_right_data()} />
            <EditAdminBottomRight data={bottom_right_data()} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminProfile;
