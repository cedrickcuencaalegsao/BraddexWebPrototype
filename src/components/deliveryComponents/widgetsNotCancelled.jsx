import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

const WidgetsDeliveryNotCancelled = (data) => {
  console.log(data.data);
  let count = data.data.count;
  let notCancelled = data.data.notCancelled;
  let calc = (notCancelled / count) * 100;
  let val = calc.toFixed(2);
  return (
    <div className="widgets-delivery">
      <div className="details-wrapper">
        <div className="title-wrapper">
          <h1 className="widget-title">Widgets Delivery Not Cancelled</h1>
        </div>
        <div className="count-wrapper">
          <span className="value-indicator">
            Widgets Delivery Not Cancelled Count
          </span>
          <span className="value">{`${notCancelled}/${count}`}</span>
        </div>
      </div>
      <div className="chart-wrapper">
        <div className="featuredChart">
          <CircularProgressbar
            value={val}
            text={`${val}%`}
            strokeWidth={10}
            styles={buildStyles({
              rotation: 1,
              strokeLinecap: "butt",
              textSize: "20px",
              textColor: "#008000",
              pathTransitionDuration: 0.5,
              pathColor: `rgb(0, 128, 0)`,
              trailColor: "#d6d6d6",
              backgroundColor: "#3e98c7",
            })}
          />
        </div>
      </div>
    </div>
  );
};
export default WidgetsDeliveryNotCancelled;
