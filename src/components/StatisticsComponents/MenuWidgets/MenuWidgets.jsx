import "./MenuWidgets.scss";
import { useEffect, useState } from "react";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

const MenuWidgets = (args) => {
  let data = args.data;
  const [menuData, setMenuData] = useState({});
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (data) {
      setMenuData(data);
    }
  }, [data]);

  const handelCollpase = () => {
    setCollapsed(!collapsed);
  };

  const calc = (args) => {
    let value;
    if (args) {
      let result = (args / menuData.count_menu) * 100;
      value = result.toFixed(2);
    }
    return value;
  };

  console.log(menuData);

  return (
    <div className="menu-widgets-container">
      <div className="top">
        <div className="title-wrapper">
          <span className="title">Menu Statistics</span>
        </div>
        <div className="toggleButton" onClick={handelCollpase}>
          {collapsed ? <ExpandMoreOutlinedIcon /> : <ExpandLessOutlinedIcon />}
        </div>
      </div>
      <div className={`bottom ${collapsed ? "collapsed" : "not-colapsed"}`}>
        <div className="items">
          <div className="indicator-wrapper">
            <span className="indicator">Best Selling</span>
          </div>
          <div className="graph-wrapper">
            <CircularProgressbar
              className="graph"
              value={calc(menuData.best_selling)}
              text={`${calc(menuData.best_selling)}%`}
              strokeWidth={10}
              styles={buildStyles({
                rotation: 1,
                strokeLinecap: "round",
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
        <div className="items">
          <div className="indicator-wrapper">
            <span className="indicator">Available</span>
          </div>
          <div className="graph-wrapper">
            <CircularProgressbar
              className="graph"
              value={calc(menuData.available)}
              text={`${calc(menuData.available)}%`}
              strokeWidth={10}
              styles={buildStyles({
                rotation: 1,
                strokeLinecap: "round",
                textSize: "20px",
                textColor: "green",
                pathTransitionDuration: 0.5,
                pathColor: `green`,
                trailColor: "#d6d6d6",
                backgroundColor: "#3e98c7",
              })}
            />
          </div>
        </div>
        <div className="items">
          <div className="indicator-wrapper">
            <span className="indicator">Limited</span>
          </div>
          <div className="graph-wrapper">
            <CircularProgressbar
              className="graph"
              value={calc(menuData.limited)}
              text={`${calc(menuData.limited)}%`}
              strokeWidth={10}
              styles={buildStyles({
                rotation: 1,
                strokeLinecap: "round",
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
        <div className="items">
          <div className="indicator-wrapper">
            <span className="indicator">Not Available</span>
          </div>
          <div className="graph-wrapper">
            <CircularProgressbar
              className="graph"
              value={calc(menuData.not_available)}
              text={`${calc(menuData.not_available)}%`}
              strokeWidth={10}
              styles={buildStyles({
                rotation: 1,
                strokeLinecap: "round",
                textSize: "20px",
                textColor: "red",
                pathTransitionDuration: 0.5,
                pathColor: `red`,
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
export default MenuWidgets;
