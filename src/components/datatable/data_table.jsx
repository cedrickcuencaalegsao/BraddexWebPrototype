import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const DataTable = (data) => {
  const history = useHistory();

  const handleEditRow = (data) => {
    history.push(`/edit-user/${data}`);
    console.log(data);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 20 },
    { field: "userID", headerName: "User ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 110 },
    { field: "lastName", headerName: "Last name", width: 110 },
    { field: "email", headerName: "Email", width: 110 },
    { field: "phone", headerName: "Phone No.", width: 110 },
    {
      field: "birthday",
      headerName: "Birthday",
      width: 110,
    },
    {
      field: "address",
      headerName: "Address",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 150,
    },
    {
      field: "accountStatus",
      headerName: "Account Status",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 130,
      // valueGetter: (value, row) => `${row.status}`,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
    {
      field: "Action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 100,
      renderCell: (params) => {
        console.log(params.row.email);
        return (
          <div className="cellAction">
            <div className="viewButton">
              {params.row.email !== "admin@braddex.com" ? (
                <EditOutlinedIcon
                  onClick={() => handleEditRow(params.row.userID)}
                />
              ) : (
                <div></div>
              )}
            </div>
          </div>
        );
      },
    },
  ];

  const rows = data.data;
  return (
    <div className="dataTable">
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

export default DataTable;
