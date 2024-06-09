import "./table_products.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const TableProducts = (data) => {
  const history = useHistory();

  const handleUpdateMenu = (menuID) => {
    console.log(menuID);
    history.push(`/update-menu/${menuID}`);
  };
  const handleDeleteMenu = (menuID) => {
    console.log(menuID);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "menuID", headerName: "Menu ID", width: 180 },
    { field: "menu_name", headerName: "Menu Name", width: 150 },
    {
      field: "price",
      headerName: "Price",
      width: 110,
      renderCell: (price) => {
        return (
          <div className="price-value">
            <span>{`₱.${price.formattedValue}`}</span>
          </div>
        );
      },
    },
    {
      field: "image",
      headerName: "Image",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      renderCell: (image) => {
        return (
          <div className="container">
            <img
              src={`http://127.0.0.1:8000/images/menu/${image.formattedValue}`}
              alt="menu"
              className="image"
            />
          </div>
        );
      },
    },
    {
      field: "bestselling",
      headerName: "Best Selling",
      width: 110,
      renderCell: (bestselling) => {
        return (
          <div className="bestselling">
            {bestselling.formattedValue === 1 ? (
              <span style={{ color: "green" }}>Yes</span>
            ) : (
              <span style={{ color: "red" }}>No</span>
            )}
          </div>
        );
      },
    },
    {
      field: "isAvialable",
      headerName: "Status",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 100,
      // valueGetter: (value, row) => `${row.status}`,
      renderCell: (isAvialable) => {
        return (
          <div className={`status ${isAvialable.formattedValue}`}>
            <span>{isAvialable.formattedValue}</span>
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 100,
      renderCell: (data) => {
        return (
          <div className="cellAction">
            <div
              className="viewButton"
              onClick={() => handleUpdateMenu(data.row.menuID)}
            >
              <EditOutlinedIcon />
            </div>
            <div
              className="deleteButton"
              onClick={() => handleDeleteMenu(data.row.menuID)}
            >
              <DeleteOutlineOutlinedIcon />
            </div>
          </div>
        );
      },
    },
  ];
  const rows = data.data;
  return (
    <div className="bottom">
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 11]}
        checkboxSelection
      />
    </div>
  );
};
export default TableProducts;
