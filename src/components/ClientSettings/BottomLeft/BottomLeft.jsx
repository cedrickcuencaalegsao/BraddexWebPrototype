import { useEffect, useState } from "react";
import "./BottomLeft.scss";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

const ClientSettingBottomLeft = (args) => {
  let data = args.data;
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    setChartData(data);
  }, [data]);
  return (
    <div className="settings-bottom-left">
      <div className="items">
        <div className="indicator-wrapper">
          <span className="indicator">Cart data</span>
        </div>
        <div className="graph-wrapper">
          <CircularProgressbar
            value={chartData.userCart}
            text={`${chartData.userCart}%`}
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
          <span className="indicator">Order data</span>
        </div>
        <div className="graph-wrapper">
          <CircularProgressbar
            value={chartData.userOrder}
            text={`${chartData.userOrder}%`}
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
    </div>
  );
};
export default ClientSettingBottomLeft;
