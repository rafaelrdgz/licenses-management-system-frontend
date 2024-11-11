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
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

function ClientsTable() {
  const { t, i18n } = useTranslation();
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
    enqueueSnackbar(t("snackbarMessage.deleteClient"), { variant: "success" });
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
      headerName: t("types.clientID"),
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
      field: "bornDate",
      headerName: t("types.bornDate"),
      flex: 1,
    },
    {
      field: "address",
      headerName: t("types.address"),
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: t("types.phoneNumber"),
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
            icon={<EditOutlinedIcon />}
            label={t("form.edit")}
            className="textPrimary"
            onClick={() => navigate(`/clients/${id}/edit`)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteOutlinedIcon />}
            label={t("form.delete")}
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
      <Header title={t("clients.title")} subtitle={t("clients.subtitle")} />
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
          {t("clients.newClient")}
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
                  fileName={t("clients.title")}
                />
              ),
            }}
          />
        )}
        <ConfirmationDialog
          title={t("dialogMessage.title")}
          text={t("dialogMessage.content")}
          open={dialogOpen}
          handleClose={handleDialogClose}
          handleAgree={handleDialogAgree}
        />
      </Box>
    </Box>
  );
}

export default ClientsTable;
