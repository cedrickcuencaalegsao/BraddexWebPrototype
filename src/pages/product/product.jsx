import "./product.scss";
import SideBar from "../../components/sideBar/side_bar";
import Navbar from "../../components/navBar/nav_bar";
import TableProducts from "../../components/products/table_products";
const List = () => {
  return (
    <div className="list">
      <SideBar />
      <div className="listContainer">
        <Navbar />
        <div className="table">
            
          <TableProducts />
        </div>
      </div>
    </div>
  );
};

export default List;
