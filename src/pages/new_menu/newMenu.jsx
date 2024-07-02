import "./newMenu.scss";
import { useState } from "react";
import axios from "axios";
import { generateRandomID } from "../../idgenerator";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";

const NewMenu = () => {
  const history = useHistory();
  const [menuName, setMenuName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null);
  const menuID = generateRandomID();

  let newPrice = parseFloat(price);

  const UploadMenu = async () => {
    try {
      const formData = new FormData();
      formData.append("menuID", menuID);
      formData.append("name", menuName);
      formData.append("price", newPrice);
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
      <div className="newMenuContainer">
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
                  onChange={(e) => setMenuName(e.target.value)}
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
              <div className="file-input-container">
                <div className="items">
                  <input type="file" onChange={handleImageChange} />
                  <span>
                    <AddAPhotoOutlinedIcon />
                  </span>
                </div>
              </div>
              <div className="submit-wrapper">
                <input type="submit" className="btn-add" onClick={onSubmit} />
              </div>
            </div>
          </div>
          <div className="preview-details">
            <div className="preview-left-container">
              <img src={preview} alt="imagePreview" className="image-preview" />
            </div>
            <div className="preview-right-container">
              <div className="preview-name-wrapper">
                <span className="indicator">Name</span>
                <span className="value">{menuName}</span>
              </div>
              <div className="preview-price-wrapper">
                <span className="indicator">Price</span>
                <span className="value">{price}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewMenu;
