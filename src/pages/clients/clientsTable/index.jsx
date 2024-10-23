import React, { useState } from "react";
import { ConfirmationDialog, Header, TableToolbar } from "../../../components";
import { Box, Button } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { esES, enUS } from "@mui/x-data-grid/locales";
import { deleteClient, getClients } from "../../../apis/ClientAPI.js";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { deleteWorker } from "../../../apis/WorkerAPI.js";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

function ClientsTable() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language; // Obtener el idioma actual

  const localeText =
    currentLanguage === "es"
      ? esES.components.MuiDataGrid.defaultProps.localeText
      : enUS.components.MuiDataGrid.defaultProps.localeText;

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogClose = () => setDialogOpen(false);
  const [selectedId, setSelectedId] = React.useState(null);

  const handleDeleteClick = (id) => () => {
    setDialogOpen(true);
    setSelectedId(id);
  };

  const handleDialogAgree = async () => {
    setDialogOpen(false);
    await deleteClient(selectedId);
    loadClients();
    enqueueSnackbar("Cliente eliminado", { variant: "success" });
  };

  const navigate = useNavigate();

  const [rows, setRows] = React.useState([]);

  //Cargar de la bd los clientes
  const loadClients = async () => {
    try {
      const data = await getClients();
      console.log(data);
      data.forEach((client) => {
        client.bornDate = dayjs(client.bornDate).format("DD/MM/YYYY");
      });
      setRows(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
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
      <SnackbarProvider maxSnack={3} />
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
        {rows.length >= 0 && (
          <DataGrid
            localeText={localeText}
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
        )}
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
