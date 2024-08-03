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

function EntityTable() {

  const navigate = useNavigate();

  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    loadEntities();
  }, []);

  //Cargar de la bd las entidades
  const loadEntities = async () => {
    /*await axios.get("").then((res) => {
      setRows(res.data);
    });*/
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
    //eleminar de la bd la entidad
  };

  const columns = [
    { field: "name", headerName: "Nombre", width: 200, editable: false },
    {
      field: "phoneNumber",
      headerName: "Número de teléfono",
      width: 150,
      editable: false,
    },
    {
      field: "email",
      headerName: "Correo",
      width: 150,
      editable: false,
    },
    {
      field: "type",
      headerName: "Tipo",
      width: 100,
      editable: false,
    },
    {
      field: "address",
      headerName: "Dirección",
      width: 350,
      editable: false,
    },
    {
      field: "directorName",
      headerName: "Nombre del director",
      width: 150,
      editable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
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
        title={"ENTIDAD"}
        subtitle={"Información de las Entidades Relacionadas"}
      />
      <Box
        sx={{
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <Button color="secondary" variant="contained" sx={{mb: '10px'}} onClick={() => navigate(`/entity/new`)}>
          Insertar nueva entidad
        </Button>
        <DataGrid
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
