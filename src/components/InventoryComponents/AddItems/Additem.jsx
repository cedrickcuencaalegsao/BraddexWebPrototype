import { useState } from "react";
import "./AddItem.scss";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { generateRandomID } from "../../../idgenerator";

const AddItems = () => {
  const [preview, setPreview] = useState("");
  const itemID = generateRandomID();


  const handleValues = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    console.log(name, value);
  };

  const saveItem = async () => {
    console.log(itemID);
    try {
      const API = await axios.post();
      console.log(API.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="add-item-container">
      <div className="top-wrapper">
        <div className="title-wrapper">
          <span className="title">Add Items</span>
        </div>
        <div className="icon-wrapper">
          <AddIcon className="btn-save" onClick={() => saveItem()} />
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
        <img src="#" alt="preview" className="image-preview" />
      </div>
    </div>
  );
};
export default AddItems;
