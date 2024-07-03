import "./inventory.scss";
import SideBar from "../../components/sideBar/side_bar";

const Inventory = () => {
  return (
    <div className="inventory-container">
      <SideBar />
      <div className="content">
        <div className="title-wrapper">
          <span className="title">Invnetory</span>
        </div>
      </div>
    </div>
  );
};
export default Inventory;
