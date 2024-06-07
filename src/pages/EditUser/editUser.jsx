import "./editUser.scss";
import SideBar from "../../components/sideBar/side_bar";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import axios from "axios";
import ProfileLeftTop from "../../components/EditUserComponents/leftTop/leftTop";
import ProfileLeftBottom from "../../components/EditUserComponents/leftBottom/leftBottom";
import ProfileRightTop from "../../components/EditUserComponents/rightTop/rightTop";
import ProfileRightCenter from "../../components/EditUserComponents/rightCenter/rightCenter";
import ProfileRightBottom from "../../components/EditUserComponents/rightbottom/rightBottom";
const EditUser = () => {
  let userUUID = useParams();
  const [userData, setUserData] = useState([]);

  // data on the left panel
  let data_left_top = {
    userID: userData.userID,
    firstName: userData.f_name,
    lastName: userData.l_name,
    email: userData.email,
    isOnline: userData.isOnline,
    image: userData.prof_pic,
  };
  let data_left_bottom = {
    userID: userData.userID,
    firstName: userData.f_name,
    lastName: userData.l_name,
    email: userData.email,
    phone: userData.phone_no,
  };
  // data on the right panel.
  let data_right_top = {
    userID: userData.userID,
    birthDate: userData.birthday,
    address: userData.address,
    created_at: userData.created_at,
    updated_at: userData.updated_at,
  };
  let data_right_center = {
    userID: userData.userID,
  };
  let data_right_bottom = {
    userID: userData.userID,
    isAdmin: userData.isAdmin,
    isActive: userData.isActive,
    isOnline: userData.isOnline,
  };
  useEffect(() => {
    const getUserDataAPI = async () => {
      let uuid = userUUID.userUUID;
      try {
        const API = await axios.get(
          `http://127.0.0.1:8000/api/profile/${uuid}`
        );
        setUserData(API.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserDataAPI();
  }, [userUUID]);

  return (
    <div className="edit-user-container">
      <SideBar />
      <div className="edit-user-wrapper">
        <div className="left">
          <ProfileLeftTop data={data_left_top} />
          <ProfileLeftBottom data={data_left_bottom} />
        </div>
        <div className="right">
          <ProfileRightTop data={data_right_top} />
          <ProfileRightCenter data={data_right_center} />
          <ProfileRightBottom data={data_right_bottom} />
        </div>
      </div>
    </div>
  );
};

export default EditUser;
