import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
const NotDeletedCart = (data) => {
  let val = data.data;
  return (
    <div className="not-deleted-cart">
      <div className="top-wrapper">
        <h1 className="title">Cart Not Deleted Percentage</h1>
      </div>
      <div className="bottom-wrapper">
        <div className="desc-wrapper">
          <h1 className="desc-title">Description</h1>
          <p className="desc">
            This is the number of items in a table cart that have not been
            marked as deleted or removed by the user, expressed as a percentage
            of the total items originally added to the cart. This metric
            provides insight into the retention of items within the cart,
            indicating how many items a user has decided to keep as opposed to
            removing them.
          </p>
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
    </div>
  );
};
export default NotDeletedCart;
