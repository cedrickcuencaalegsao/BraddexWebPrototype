import "./order.scss";
import SideBar from "../../components/sideBar/side_bar";
import NavBar from "../../components/navBar/nav_bar";

import TableOrder from "../../components/tableorder/table_order";

const OrderList = () => {
    return(
        <div className="orderList">
            <SideBar/>
            <div className="orderContainer">
                <NavBar/>
                <div className="tableOrders">
                    <TableOrder/>
                </div>
            </div>
        </div>
    )
}

export default OrderList;