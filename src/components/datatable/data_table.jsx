import { render } from "react-dom";
import "./datatable.scss";
import { DataGrid } from '@mui/x-data-grid';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
    {
      field: 'status',
      headerName: 'Status',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 100,
      // valueGetter: (value, row) => `${row.status}`,
      renderCell:(params)=>{
        return(
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        )
      }
    },
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, status:'Online'},
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, status:'Offline' },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, status:'Online' },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, status:'Offline' },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null, status:'Offline' },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150, status:'Online' },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, status:'Offline' },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, status:'Offline' },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, status:'Online' },
    { id: 10, lastName: 'Roxie', firstName: 'Harvey', age: 65, status:'Offline' },
    { id: 11, lastName: 'Roxie', firstName: 'Harvey', age: 65, status:'Offline' },
  ];

const dataTable = () => {
    const actionColomn = [
      {
        field: 'Action',
        headerName: 'Action',
        sortable: false,
        width: 100,
        renderCell:()=>{
          return(
            <div className="cellAction">
              <div className="viewButton"><EditOutlinedIcon/></div>
              <div className="deleteButton"><DeleteOutlineOutlinedIcon/></div>
            </div>
          );
        },
      },
    ];
    return(
        <div className="dataTable">
          <div className="table">
            <DataGrid
                rows={rows}
                columns={columns.concat(actionColomn)}
                initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[5, 11]}
                checkboxSelection
            />
          </div>
        </div>
    )
}

export default dataTable
