import { useState } from "react";
import "./AddItem.scss";
import axios from "axios";
import { generateRandomID } from "../../../idgenerator";
import SaveIcon from "@mui/icons-material/Save";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";

const AddItems = () => {
  const itemID = generateRandomID();
  const [preview, setPreview] = useState("");

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleValues = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "setName") {
      setName(value);
    } else if (name === "setPrice") {
      setPrice(value);
    } else if (name === "setQuantity") {
      setQuantity(value);
    }
  };

  const previewPicture = (e) => {
    const file = e.target.files[0];
    setImage(file);
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

  const saveItem = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("itemID", itemID);
      formData.append("name", name);
      formData.append("price", price);
      formData.append("quantity", quantity);
      // add-items
      const API = await axios.post(
        "http://127.0.0.1:8000/api/add-items",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(API.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="add-item-container">
      <div className="top-wrapper">
        <div className="title-wrapper">
          <span className="title">Add Items</span>
        </div>
        <div className="action-button-wrapper">
          <div className="btn-add-image-wrapper">
            <AddAPhotoOutlinedIcon className="btn-add-image" />
            <input type="file" onChange={previewPicture} />
          </div>
          <div className="icon-wrapper">
            <SaveIcon className="btn-save" onClick={() => saveItem()} />
          </div>
        </div>
      </div>
      <div className="center">
        <div className="items">
          <span className="indicator">Item name</span>
          <input
            type="text"
            className="value"
            name="setName"
            onChange={(e) => handleValues(e)}
          />
        </div>
        <div className="items">
          <span className="indicator">Price</span>
          <input
            type="number"
            className="value"
            name="setPrice"
            onChange={(e) => handleValues(e)}
          />
        </div>
        <div className="items">
          <span className="indicator">Quantity</span>
          <input
            type="number"
            className="value"
            name="setQuantity"
            onChange={(e) => handleValues(e)}
          />
        </div>
      </div>
      <div className="bottom-wrapper">
        {preview ? (
          <img src={preview} alt="preview" className="preview" />
        ) : (
          <img
            src={`http://127.0.0.1:8000/images/preview/preview.png`}
            alt="preview"
            className="image-preview"
          />
        )}
      </div>
    </div>
  );
};
export default AddItems;
