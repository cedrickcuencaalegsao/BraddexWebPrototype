import "./EditMenu.scss";
import SideBar from "../../components/sideBar/side_bar";
import NavBar from "../../components/navBar/nav_bar";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import axios from "axios";
import EditCartLeftTop from "../../components/EditCartComponents/CartLeftTop/CartLeftTop";
import EditCartLeftBottom from "../../components/EditCartComponents/CartLeftBottom/CartLeftBottom";

const UpdateMenu = () => {
  const { menuID } = useParams();
  const [menuData, setMenuData] = useState([]);
  const [countCart, setCountCart] = useState(0);
  const [countOrder, setCountOrder] = useState(0);
  const [menuInCart, setMenuInCart] = useState(0);
  const [menuInOrder, setMenuInOrder] = useState(0);

  useEffect(() => {
    // function to get the data of the menu we want to edit
    const getMenuDataAPI = async () => {
      try {
        const API = await axios.get(
          `http://127.0.0.1:8000/api/get-menu-data/${menuID}`
        );
        setMenuData(API.data.menu); // data of the menu
        setCountCart(API.data.cartCount); // count of all item in table cart
        setMenuInCart(API.data.menuInTbl_Cart); // count of the menu in table cart where not been deleted
        setCountOrder(API.data.orderCount); // count of all item in table order
        setMenuInOrder(API.data.menuInTbl_Order); // count of the menu in table order that's not deleted
      } catch (error) {
        console.log(error);
      }
    };
    getMenuDataAPI();
  }, [menuID]);

  console.log(menuData, countCart, countOrder, menuInCart, menuInOrder);

  return (
    <div className="updateMenu">
      <SideBar />
      <div className="updateMenuContainer">
        <NavBar />
        <div className="details-container">
          <h1>{menuData.image}</h1>
          <div className="left">
            <EditCartLeftTop />
            <EditCartLeftBottom />
          </div>
          <div className="right">Right</div>
        </div>
      </div>
    </div>
  );
};
export default UpdateMenu;
