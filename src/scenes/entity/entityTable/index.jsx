import React from "react";
import { Header } from "../../../components";
import { Box, Button } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

function EntityTable() {
  const initialRows = [
    {
      id: "213",
      name: "Rafael Rodriguez Perez",
      phoneNumber: "55362350",
      address:
        "sadsad sad sadsadsadsadsa dsadsadsa dsadsadsad sad sa dsa4546 45645",
      email: "dasdsadsadsadsadsa",
      directorName: "dasdsa dsadsadsadsa dasdsadsa",
      type: "autoescuela",
    },
  ];

  const navigate = useNavigate();

  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "name", headerName: "Nombre", width: 250, editable: false },
    {
      field: "phoneNumber",
      headerName: "Número de teléfono",
      width: 150,
      editable: false,
    },
    {
      field: "email",
      headerName: "Correo",
      width: 200,
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
      width: 200,
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
            icon={<DeleteIcon />}
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
          height: 650,
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
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
        />
      </Box>
    </Box>
  );
}

export default EntityTable;
