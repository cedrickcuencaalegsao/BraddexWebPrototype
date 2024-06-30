import { useEffect, useState } from "react";
import "./RightTop.scss";
import SaveIcon from "@mui/icons-material/Save";
const ClientSettingTopRight = (args) => {
  let data = args.data;
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    setUserData(data);
  }, [data]);
  const handleSaveChanges = () => {
    console.log(userData);
  };
  return (
    <div className="settings-top-right">
      <div className="top-section">
        <div className="title-wrapper">
          <span className="title">account details</span>
        </div>
        <div className="button-wrapper">
          <SaveIcon className="btn-save" onClick={() => handleSaveChanges()} />
        </div>
      </div>
      <div className="bottom-section">
        {userData.map((item)=>(
          <div className="details" key={item.id}>
            
          </div>
        ))}
      </div>
    </div>
  );
};
export default ClientSettingTopRight;
