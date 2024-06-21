import "./client_navBar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useState, useEffect } from "react";

const ClientNavBar = () => {
  const history = useHistory();
  const uuid = localStorage.getItem("uuid");
  const [data, setData] = useState([]);

  useEffect(() => {
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
    fetchData();
  }, [uuid]);


  const handleLogout = async () => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/logout/${uuid}`);
      localStorage.removeItem("token");
      localStorage.removeItem("uuid");
      localStorage.removeItem("isAdmin");
      history.push("/");
    } catch (error) {
      console.log(error);
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
          <div className="item" onClick={handleLogout}>
            <LogoutOutlinedIcon />
          </div>
          <div className="item" onClick={handleProfile}>
            <img
              src={`http://127.0.0.1:8000/images/profile/${data.prof_pic}`}
              alt="avatar"
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientNavBar;
