import "./nav_bar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

const NavBar = () => {
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

  const clickImage = () => {
    history.push("/profile");
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <img
              src={`http://127.0.0.1:8000/images/profile/${data.prof_pic}`}
              alt="avatar"
              className="avatar"
              onClick={() => clickImage()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
