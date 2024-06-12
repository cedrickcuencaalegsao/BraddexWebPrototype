import "./EditMenuRightCenter.scss";
import { useState, useEffect } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

const EditMenuRightCenter = (data) => {
  const [countCart, setCountCart] = useState(0);
  const [countOrder, setCountOrder] = useState(0);
  const [menuInCart, setMenuInCart] = useState(0);
  const [menuInOrder, setMenuInOrder] = useState(0);

  useEffect(() => {
    setCountCart(data.data.countCart);
    setCountOrder(data.data.countOrder);
    setMenuInCart(data.data.menuInCart);
    setMenuInOrder(data.data.menuInOrder);
  }, [data]);

  let menu_stat_cart = (menuInCart / countCart) * 100;
  let menu_stat_order = (menuInOrder / countCart) * 100;

  let val_stat_cart = menu_stat_cart.toFixed(2);
  let val_stat_order = menu_stat_order.toFixed(2);

  console.log(val_stat_cart, val_stat_order);
  console.log(countCart, menuInCart, countOrder, menuInOrder);

  return (
    <div className="edit-menu-right-center">
      <div className="left">
        <div className="title-wrapper">
          <span className="title">menu in cart statistics (not deleted)</span>
        </div>
        <div className="details-container">
          <div className="details-wrapper">
            <span className="details">
              {menuInCart}/{countCart}
            </span>
          </div>
          <div className="featured-chart-wrapper">
            <CircularProgressbar
              value={val_stat_cart}
              text={`${val_stat_cart}%`}
              strokeWidth={10}
              styles={buildStyles({
                rotation: 1,
                strokeLinecap: "butt",
                textSize: "20px",
                textColor: "goldenrod",
                pathTransitionDuration: 0.5,
                pathColor: `goldenrod`,
                trailColor: "#d6d6d6",
                backgroundColor: "#3e98c7",
              })}
            />
          </div>
        </div>
      </div>
      <div className="right">
        <div className="title-wrapper">
          <span className="title">menu in order statistics (not deleted)</span>
        </div>
        <div className="details-container">
          <div className="details-wrapper">
            <span className="details">
              {menuInOrder}/{countOrder}
            </span>
          </div>
          <div className="featured-chart-wrapper">
            <CircularProgressbar
              value={val_stat_order}
              text={`${val_stat_order}%`}
              strokeWidth={10}
              styles={buildStyles({
                rotation: 1,
                strokeLinecap: "butt",
                textSize: "20px",
                textColor: "purple",
                pathTransitionDuration: 0.5,
                pathColor: `purple`,
                trailColor: "#d6d6d6",
                backgroundColor: "#3e98c7",
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditMenuRightCenter;
