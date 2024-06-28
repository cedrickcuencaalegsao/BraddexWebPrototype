import "./BottomRight.scss";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect, useState } from "react";

const EditAdminBottomRight = (args) => {
  const data = args.data;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  return (
    <div className="edit-admin-top-left">
      <div className="progress">
        {loading ? (
          <div className="loading">
            <LinearProgress
              sx={{
                bgcolor: "lightgray",
                "& .MuiLinearProgress-bar": { bgcolor: "orangered" },
              }}
            />
          </div>
        ) : (
          <div className="loading"></div>
        )}
      </div>
    </div>
  );
};
export default EditAdminBottomRight;
