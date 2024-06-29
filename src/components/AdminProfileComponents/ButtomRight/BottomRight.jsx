import "./BottomRight.scss";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";

const EditAdminBottomRight = (args) => {
  const data = args.data;
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [profilePicture, setProfilePicture] = useState("");
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (data) {
      setUserData(data);
      setLoading(false);
    }
  }, [data]);

  const previewPicture = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
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

  console.log(userData);

  return (
    <div className="edit-admin-bottom-right">
      <div className="top">
        <div className="title-wrapper">
          <span className="title">Update Profile</span>
        </div>
        <div className="buttons-wrapper">
          <div className="btn-add-image-wrapper">
            <AddAPhotoOutlinedIcon className="btn-add-image" />
            <input type="file" onChange={previewPicture} />
          </div>
          <div className="btn-save-wrapper">
            <SaveIcon className="btn-save" />
          </div>
        </div>
      </div>
      <div className="progress">
        {loading ? (
          <div className="loading">
            <LinearProgress
              sx={{
                bgcolor: "lightgray",
                "& .MuiLinearProgress-bar": { bgcolor: "orangered" },
              }}
            />
          </div>
        ) : (
          <div className="loading"></div>
        )}
      </div>
      <div className="bottom">
        <div className="image-preview">
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
export default EditAdminBottomRight;
