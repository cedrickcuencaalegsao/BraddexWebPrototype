import "./table_products.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import axios from "axios";
import LinearProgress from "@mui/material/LinearProgress";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

const TableProducts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const MenuAPI = async () => {
      try {
        const API = await axios.get("http://127.0.0.1:8000/api/menu");
        setData(API.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    MenuAPI();
    const interval = setInterval(() => {
      MenuAPI();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="table">
      <div className="top">
        <div className="left">
          <div className="title">PRODUCTS AVAILABLE</div>
        </div>
        <div className="center">
          <div className="title">PRODUCT LIMITED</div>
        </div>
        <div className="right">
          <div className="title">PRODUCT NOT-AVAILABLE</div>
        </div>
      </div>
      <div className="bottom">
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Menu Id No.</TableCell>
                <TableCell align="right">Menu Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Image</TableCell>
                <TableCell align="right">Date Added</TableCell>
                <TableCell align="right"> Best Selling</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.menuID}
                  </TableCell>
                  <TableCell align="right">{row.menu_name}</TableCell>
                  <TableCell align="right">{`₱ ${row.price}`}</TableCell>
                  <TableCell align="right">
                    <div className="cellWrapper">
                      <img
                        src={`http://127.0.0.1:8000/images/menu/${row.image}`}
                        alt="image"
                        className="image"
                      />
                    </div>
                  </TableCell>
                  <TableCell align="right">{row.created_at}</TableCell>
                  <TableCell align="right">
                    {row.bestselling === 1 ? (
                      <div className={`beselling${row.bestselling}`}>
                        <span style={{ color: "green" }}>Yes</span>
                      </div>
                    ) : (
                      <div className={`beselling${row.bestselling}`}>
                        <span style={{ color: "red" }}>No</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <span className={`status ${row.isAvialable}`}>
                      {row.isAvialable}
                    </span>
                  </TableCell>
                  <TableCell align="right">
                    <div className="menu-action-button">
                      <div className="edit-menu">
                        <ModeEditOutlineOutlinedIcon />
                      </div>
                      <div className="delete-menu">
                        <DeleteRoundedIcon />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
export default TableProducts;
