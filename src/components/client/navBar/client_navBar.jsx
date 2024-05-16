import "./client_navBar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useState, useEffect } from "react";

const ClientNavBar = () => {
  const history = useHistory();
  const uuid = localStorage.getItem("uuid");
  const [data, setData] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/profile/${uuid}`
      );
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleNotificaiton = () => {
    history.push("/client-notification");
  };

  const handleLogout = async () => {
    const id = localStorage.getItem("id");
    try {
      await axios.post(`http://127.0.0.1:8000/api/logout/${id}`);
      localStorage.removeItem("token");
      localStorage.removeItem("uuid");
      localStorage.removeItem("isAdmin");
      history.push("/");
    } catch (error) {
      alert(error);
    }
  };
  const handleProfile = () => {
    history.push("/client-profile");
  };
  return (
    <div className="clientNavbar">
      <div className="clientNabarContainer">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="clientItems">
          <div className="item" onClick={handleNotificaiton}>
            <NotificationsNoneOutlinedIcon className="icons" />
            <div className="counter">5</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icons" />
            <div className="counter">2</div>
          </div>
          <div className="item" onClick={handleLogout}>
            <LogoutOutlinedIcon />
          </div>
          <div className="item" onClick={handleProfile}>
            <img
              src={`http://127.0.0.1:8000/images/profile/${data.prof_pic}`}
              alt="image"
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientNavBar;
