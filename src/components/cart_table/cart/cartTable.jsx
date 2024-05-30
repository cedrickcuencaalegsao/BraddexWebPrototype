import { DataGrid } from "@mui/x-data-grid";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
const CartTable = (data) => {
  const columns = [
    { field: "id", headerName: "ID", width: 20 },
    { field: "cartID", headerName: "Cart ID", width: 180 },
    { field: "userID", headerName: "Own By", width: 180 },
    { field: "menuID", headerName: "Menu ID", width: 180 },
    { field: "isDeleted", headerName: "Deleted", width: 100 },
    { field: "created_at", headerName: "Date Added", width: 150 },
    { field: "updated_at", headerName: "Date Updated", width: 150 },
    {
      field: "Action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 100,
      renderCell: () => {
        return (
          <div className="cellAction">
            <div className="viewButton">
              <EditOutlinedIcon />
            </div>
            <div className="deleteButton">
              <DeleteOutlineOutlinedIcon />
            </div>
          </div>
        );
      },
    },
  ];
  let rows = data.data;
  return (
    <div className="cart-table">
      <div className="table">
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[0, 11]}
          checkboxSelection
        />
      </div>
    </div>
  );
};
export default CartTable;