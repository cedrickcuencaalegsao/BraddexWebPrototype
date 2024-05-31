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

  let data_left_top = {
    userID: userData.userID,
    firstName: userData.f_name,
    lastName: userData.l_name,
    email: userData.email,
    isOnline: userData.isOnline,
    image: userData.prof_pic,
  };
  let data_left_bottom = {
    firstName: userData.f_name,
    lastName: userData.l_name,
    email: userData.email,
    phone: userData.phone_no,
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
          <ProfileRightTop />
          <ProfileRightCenter />
          <ProfileRightBottom />
        </div>
      </div>
    </div>
  );
};

export default EditUser;
