import "./newMenu.scss";
import NavBar from "../../components/navBar/nav_bar";
import SideBar from "../../components/sideBar/side_bar";
import { useState } from "react";
import axios from "axios";
import { generateRandomID } from "../../idgenerator";

const NewMenu = () => {
  const [menuname, setMenuname] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const menuID = generateRandomID();

  let newprice = parseFloat(price);
  
  const UploadMenu = async () => {
    try {
      const formData = new FormData();
      formData.append("menuID", menuID);
      formData.append("name", menuname);
      formData.append("price", newprice);
      formData.append("image", image);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/uploadmenu",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
    } catch (err) {
      alert(err);
    }
  };

  const onSubmit = () => {
    UploadMenu();
  };

  return (
    <div className="newMenu">
      <SideBar />
      <div className="newMenuContainer">
        <NavBar />
        <div className="formContainer">
          <div className="messages">
            <span style={{ fontSize: "15px", color: "red" }}>{message}</span>
          </div>
          <h1>uploadmenu</h1>
          Menu Name:
          <input type="text" onChange={(e) => setMenuname(e.target.value)} />
          Price:
          <input type="text" onChange={(e) => setPrice(e.target.value)} />
          Image:
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <input type="submit" onClick={onSubmit} />
        </div>
      </div>
    </div>
  );
};
export default NewMenu;
