import "./EditMenu.scss";
import SideBar from "../../components/sideBar/side_bar";
import NavBar from "../../components/navBar/nav_bar";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import axios from "axios";
import EditMenuLeftTop from "../../components/EditMenuComponents/EditMenuLeftTop/EditMenuLeftTop";
import EditMenuLeftBottom from "../../components/EditMenuComponents/EditMenuLeftBottom/EditMenuLeftBottom";
import EditMenuRightTop from "../../components/EditMenuComponents/EditMenuRightTop/EditMenuRightTop";
import EditMenuRightCenter from "../../components/EditMenuComponents/EditMenuRightCenter/EditMenuRightCenter";
import EditMenuRightBottom from "../../components/EditMenuComponents/EditMenuRightBottom/EditMenuRightBottom";

const EditMenu = () => {
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

  const leftTopData = () => {
    if (menuData.length !== 0) {
      return menuData.map((item) => ({
        image: item.image,
        menuName: item.menu_name,
        menuID: item.menuID,
        price: item.price,
      }));
    }
    return [];
  };
  console.log(menuData, countCart, countOrder, menuInCart, menuInOrder);

  const leftBottomData = () => {
    if (menuData.length !== 0) {
      return menuData.map((item) => ({
        menuID: item.menuID,
        isAvailable: item.isAvialable,
      }));
    }
    return [];
  };

  let left_top_data = leftTopData();
  let left_bottom_data = leftBottomData();
  let right_bottom_data = {
    countCart: countCart,
    countOrder: countOrder,
    menuInCart: menuInCart,
    menuInOrder: menuInOrder,
  };

  return (
    <div className="updateMenu">
      <SideBar />
      <div className="updateMenuContainer">
        <NavBar />
        <div className="details-container">
          <div className="left">
            <EditMenuLeftTop data={left_top_data} />
            <EditMenuLeftBottom data={left_bottom_data} />
          </div>
          <div className="right">
            <EditMenuRightTop data={menuData} />
            <EditMenuRightCenter data={right_bottom_data} />
            <EditMenuRightBottom data={menuID} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditMenu;
