import "./AddItem.scss";
import AddIcon from "@mui/icons-material/Add";

const AddItems = () => {
  return (
    <div className="add-item-container">
      <div className="top-wrapper">
        <div className="title-wrapper">
          <span className="title">Add Items</span>
        </div>
        <div className="icon-wrapper">
          <AddIcon className="icon" />
        </div>
      </div>
      <div className="bottom-wrapper">
        <img src="#" alt="preview" className="image-preview" />
      </div>
    </div>
  );
};
export default AddItems;
