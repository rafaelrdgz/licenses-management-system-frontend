import React from "react";
import { ConfirmationDialog, Header, TableToolbar } from "../../../components";
import { Box, Button } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { esES, enUS } from "@mui/x-data-grid/locales";
import { useState } from "react";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { deleteClient, getClients } from "../../../apis/ClientAPI.js";
import { deleteWorker, getWorkers } from "../../../apis/WorkerAPI.js";
import { useTranslation } from "react-i18next";

function WorkersTable () {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language; // Obtener el idioma actual

  const localeText =
    currentLanguage === "es"
      ? esES.components.MuiDataGrid.defaultProps.localeText
      : enUS.components.MuiDataGrid.defaultProps.localeText;

  const navigate = useNavigate();

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogClose = () => setDialogOpen(false);
  const [selectedId, setSelectedId] = React.useState(null);

  const handleDeleteClick = (id) => () => {
    setDialogOpen(true);
    setSelectedId(id);
  };

  const handleDialogAgree = async () => {
    setDialogOpen(false);
    await deleteWorker(selectedId);
    loadClients();
    enqueueSnackbar(t("snackbarMessage.deleteWorker"), { variant: "success" });
  };

  //quitar el objeto y dejar el array vacio al cargar de la bd
  const [rows, setRows] = React.useState([
    {
      id: "135135135351",
      name: "Rafael",
      lastNames: "Rodriguez Perez",
      role: "manager",
      email: "sadsadsadsadsfadsa",
    },
  ]);

  //Cargar de la bd los clientes
  const loadClients = async () => {
    try {
      const data = await getWorkers();
      console.log(data);
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
      headerName: "CI",
      flex: 1,
    },
    {
      field: "name",
      headerName: t("types.name"),
      flex: 1,
    },
    {
      field: "lastNames",
      headerName: t("types.lastNames"),
      flex: 1,
    },
    {
      field: "role",
      headerName: t("types.role"),
      flex: 1,
    },
    {
      field: "email",
      headerName: t("types.email"),
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      headerName: t("types.actions"),
      flex: 0.5,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={ <EditOutlinedIcon /> }
            label="Edit"
            className="textPrimary"
            onClick={ () => navigate(`/workers/${id}/edit`) }
            color="inherit"
          />,
          <GridActionsCellItem
            icon={ <DeleteOutlinedIcon /> }
            label="Delete"
            onClick={ handleDeleteClick(id) }
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box m="20px">
      <SnackbarProvider maxSnack={ 3 } />
      <Header
        title={ t("workers.title") }
        subtitle={ t("workers.subtitle") }
      />
      <Box
        sx={ {
          height: "75vh",
          maxflex: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        } }
      >
        <Button
          color="secondary"
          variant="contained"
          sx={ { mb: "10px" } }
          onClick={ () => navigate(`/workers/new`) }
        >
          { t("workers.newWorker") }
        </Button>
        <DataGrid
          localeText={ localeText }
          initialState={ {
            pagination: {
              paginationModel: { pageSize: 25, page: 0 },
            },
          } }
          rows={ rows }
          columns={ columns }
          components={ {
            Toolbar: () => (
              <TableToolbar
                columns={ columns }
                rows={ rows }
                fileName={ "Clientes" }
              />
            ),
          } }
        />
        <ConfirmationDialog
          title={ t("workers.deleteConfirmationTitle") }
          text={ t("workers.deleteConfirmationText") }
          open={ dialogOpen }
          handleClose={ handleDialogClose }
          handleAgree={ handleDialogAgree }
        />
      </Box>
    </Box>
  );
}

export default WorkersTable;
