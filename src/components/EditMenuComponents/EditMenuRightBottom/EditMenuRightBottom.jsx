import "./EditMenuRightBottom.scss";
import { useEffect, useState } from "react";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import axios from "axios";

const EditMenuRightBottom = (data) => {
  const [menuData, setMenuData] = useState("");
  const [menuImage, setMenuImage] = useState("");
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    setMenuData(data.data);
  }, [data]);

  const previewPicture = (e) => {
    const file = e.target.files[0];
    setMenuImage(file);
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
  const saveImage = async () => {
    try {
      const formData = new FormData();
      formData.append("menuID", menuData);
      formData.append("image", menuImage);
      const API = await axios.post(
        "http://127.0.0.1:8000/api/update-menu-image/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(API.data);
    } catch (error) {
      console.log(error);
    }
    // console.log(menuData, menuImage);
  };
  return (
    <div className="edit-menu-right-bottom">
      <div className="top">
        <div className="title-wrapper">
          <span className="title">update image</span>
        </div>
        <div className="btn-save-wrapper">
          <SaveOutlinedIcon className="btn-save" onClick={() => saveImage()} />
        </div>
      </div>
      <div className="update-profile-picture">
        <div className="file-input-container">
          <div className="items">
            <input type="file" onChange={previewPicture} />
            <span>
              <AddAPhotoOutlinedIcon />
            </span>
          </div>
        </div>
        <div className="preview">
          {preview ? (
            <img src={preview} alt="preview" />
          ) : (
            <span>No preview available</span>
          )}
        </div>
      </div>
    </div>
  );
};
export default EditMenuRightBottom;
