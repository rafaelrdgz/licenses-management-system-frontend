import React from "react";
import { ConfirmationDialog, Header, TableToolbar } from "../../../components";
import { Box, Button } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { esES } from "@mui/x-data-grid/locales";
import { useState } from "react";
import { enqueueSnackbar, SnackbarProvider } from "notistack";

function ClientsTable() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogClose = () => setDialogOpen(false);
  const [selectedId, setSelectedId] = React.useState(null);

  const handleDeleteClick = (id) => () => {
    setDialogOpen(true);
    setSelectedId(id);
  };

  const handleDialogAgree = () => {
    setDialogOpen(false);
    setRows(rows.filter((row) => row.id !== selectedId));
    //Eliminar de la bd

    enqueueSnackbar('Cliente eliminado', { variant: 'success' })
  };

  const navigate = useNavigate();

  //quitar el objeto y dejar el array vacio al cargar de la bd
  const [rows, setRows] = React.useState([
    {
      id: "135135135351",
      name: "Rafael",
      lastNames: "Rodriguez Perez",
      bornDate: "2021-10-10",
      address: "dsadsadsa dsadsadsadsa dsadsad 131 saddsa",
      phoneNumber: "55362350",
      email: "sadsadsadsadsfadsa",
    },
  ]);

  //Cargar de la bd los clientes
  const loadClients = async () => {
    /*await axios.get("").then((res) => {
        setRows(res.data);
      });*/
  };

  React.useEffect(() => {
    loadClients();
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "CI cliente",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
    },
    {
      field: "lastNames",
      headerName: "Apellidos",
      flex: 1,
    },
    {
      field: "bornDate",
      headerName: "Fecha de nacimiento",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Dirección",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Número de teléfono",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Correo",
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      flex: 0.5,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditOutlinedIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => navigate(`/clients/${id}/edit`)}
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
      <SnackbarProvider maxSnack={3}/>
      <Header title={"CLIENTES"} subtitle={"Información de los clientes"} />
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
        <Button
          color="secondary"
          variant="contained"
          sx={{ mb: "10px" }}
          onClick={() => navigate(`/clients/new`)}
        >
          Nuevo cliente
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
            Toolbar: () => (
              <TableToolbar
                columns={columns}
                rows={rows}
                fileName={"Clientes"}
              />
            ),
          }}
        />
        <ConfirmationDialog
          title={"Desea eliminar el cliente?"}
          text={"Tenga en cuenta que esta acción no se puede deshacer"}
          open={dialogOpen}
          handleClose={handleDialogClose}
          handleAgree={handleDialogAgree}
        />
      </Box>
    </Box>
  );
}

export default ClientsTable;
