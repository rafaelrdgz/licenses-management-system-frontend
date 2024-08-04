import React from "react";
import { Header, TableToolbar } from "../../../components";
import { Box, Button } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {
  DataGrid,
  GridActionsCellItem
} from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { esES } from '@mui/x-data-grid/locales';

function EntityTable() {

  const navigate = useNavigate();

  //quitar el objeto y dejar el array vacio al cargar de la bd
  const [rows, setRows] = React.useState([{
    id: '213',
    name: 'Rafael Rodriguez Perez',
    phoneNumber: '55362350',
    address: 'sadsad sad sadsadsadsadsa dsadsadsa dsadsadsad sad sa dsa4546 45645',
    email: 'dasdsadsadsadsadsa',
    directorName: "dasdsa dsadsadsadsa dasdsadsa",
    type: "autoescuela"
  }]);

  //Cargar de la bd las entidades
  const loadEntities = async () => {
    /*await axios.get("").then((res) => {
      setRows(res.data);
    });*/
  };

  React.useEffect(() => {
    loadEntities();
  }, []);

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
    //eleminar de la bd la entidad
  };

  const columns = [
    { field: "name", headerName: "Nombre", flex: 1, editable: false },
    {
      field: "phoneNumber",
      headerName: "Número de teléfono",
      flex: 1,
      editable: false,
    },
    {
      field: "email",
      headerName: "Correo",
      flex: 1,
      editable: false,
    },
    {
      field: "type",
      headerName: "Tipo",
      flex: 1,
      editable: false,
    },
    {
      field: "address",
      headerName: "Dirección",
      flex: 1,
      editable: false,
    },
    {
      field: "directorName",
      headerName: "Nombre del director",
      flex: 1,
      editable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      flex: .5,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditOutlinedIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => navigate(`/entity/${id}/edit`)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteOutlinedIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box m="20px">
      <Header
        title={"ENTIDADES"}
        subtitle={"Información de las Entidades Relacionadas"}
      />
      <Box
        sx={{
          height: "75vh",
          maxflex: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <Button color="secondary" variant="contained" sx={{mb: '10px'}} onClick={() => navigate(`/entity/new`)}>
          Nueva entidad
        </Button>
        <DataGrid
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 25, page: 0 },
            },
          }}
          rows={rows}
          columns={columns}
          components={{
            Toolbar: () => <TableToolbar columns={columns} rows={rows} fileName={'Entidades'} />,
          }}
        />
      </Box>
    </Box>
  );
}

export default EntityTable;
