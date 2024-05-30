import { DataGrid } from "@mui/x-data-grid";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const TableOrder = (data) => {
  const columns = [
    { field: "id", headerName: "ID", width: 20 },
    { field: "orderID", headerName: "Order ID", width: 110 },
    { field: "userID", headerName: "Own By", width: 80 },
    { field: "menuID", headerName: "Menu ID", width: 80 },
    { field: "paymentType", headerName: "Payment Type", width: 80 },
    { field: "userAddres", headerName: "Delivery Adress", width: 80 },
    { field: "totalAmmount", headerName: "Ammount", width: 100 },
    { field: "quantity", headerName: "Quantiy", width: 80 },
    { field: "isPaid", headerName: "Paid", width: 80 },
    { field: "isDeleted", headerName: "Deleted", width: 80 },
    { field: "created_at", headerName: "Date Added", width: 100 },
    { field: "updated_at", headerName: "Date Updated", width: 100 },
    {
      field: "Action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 50,
      renderCell: () => {
        return (
          <div className="cellAction">
            <div className="viewButton">
              <EditOutlinedIcon />
            </div>
          </div>
        );
      },
    },
  ];
  let rows = data.data;
  return (
    <div className="tableOrder">
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
  );
};

export default TableOrder;