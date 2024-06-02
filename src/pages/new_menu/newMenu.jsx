import "./newMenu.scss";
import NavBar from "../../components/navBar/nav_bar";
import SideBar from "../../components/sideBar/side_bar";
import { useState } from "react";
import axios from "axios";
import { generateRandomID } from "../../idgenerator";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const NewMenu = () => {
  const history = useHistory();
  const [menuname, setMenuname] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null);
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
      response && history.push("/products");
    } catch (err) {
      alert(err);
    }
  };

  const onSubmit = () => {
    UploadMenu();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="newMenu">
      <SideBar />
      <div className="newMenuContainer">
        <NavBar />
        <div className="data-container">
          <div className="form-container">
            <div className="title-wrapper">
              <h1 className="title">upload menu</h1>
              <div className="messages">
                <span style={{ fontSize: "15px", color: "red" }}>
                  {message}
                </span>
              </div>
            </div>
            <div className="input-container">
              <div className="input-wrapper">
                <span className="input-indicator">Menu Name</span>
                <input
                  type="text"
                  className="input"
                  onChange={(e) => setMenuname(e.target.value)}
                />
              </div>
              <div className="input-wrapper">
                <span className="input-indicator">Price</span>
                <input
                  type="text"
                  className="input"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="input-wrapper">
                <span className="input-indicator">Image</span>
                <input
                  type="file"
                  className="input-image"
                  onChange={handleImageChange}
                />
              </div>
              <div className="submit-wrapper">
                <input type="submit" onClick={onSubmit} />
              </div>
            </div>
          </div>
          <div className="preview-details">
            <img
              src={preview}
              alt="imagePreview"
              className="image-preview"
              style={{ width: "300px", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewMenu;
