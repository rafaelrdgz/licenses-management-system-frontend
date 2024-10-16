import React, { useState } from "react";
import { ConfirmationDialog, Header, TableToolbar } from "../../../components";
import { Box, Button } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { esES, enUS } from "@mui/x-data-grid/locales";
import { deleteEntity, getEntities } from "../../../apis/EntityAPI.js";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { useTranslation } from "react-i18next";

function EntityTable() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language; // Obtener el idioma actual

  const localeText =
    currentLanguage === "es"
      ? esES.components.MuiDataGrid.defaultProps.localeText
      : enUS.components.MuiDataGrid.defaultProps.localeText;

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogClose = () => setDialogOpen(false);
  const [selectedId, setSelectedId] = React.useState(null);

  const navigate = useNavigate();

  const [rows, setRows] = React.useState([]);

  const loadEntities = async () => {
    try {
      const data = await getEntities();
      console.log(data);
      setRows(data);
    } catch (error) {
      console.error("Error fetching entities:", error);
    }
  };

  React.useEffect(() => {
    loadEntities();
  }, []);

  const handleDeleteClick = (code) => () => {
    setDialogOpen(true);
    setSelectedId(code);
  };

  const handleDialogAgree = async () => {
    setDialogOpen(false);
    await deleteEntity(selectedId);
    loadEntities();
    enqueueSnackbar("Entidad eliminada", { variant: "success" });
  };

  const columns = [
    { field: "code", headerName: "Código", flex: 1, editable: false },
    { field: "name", headerName: "Nombre", flex: 1, editable: false },
    {
      field: "phone",
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
      flex: 0.5,
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
      <SnackbarProvider maxSnack={3} />
      <Header
        title={"ENTIDADES"}
        subtitle={"Información de las entidades relacionadas"}
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
        <Button
          color="secondary"
          variant="contained"
          sx={{ mb: "10px" }}
          onClick={() => navigate(`/entity/new`)}
        >
          Nueva entidad
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
            getRowId={(row) => {
              return row.code;
            }}
            components={{
              Toolbar: () => (
                <TableToolbar
                  columns={columns}
                  rows={rows}
                  fileName={"Entidades"}
                />
              ),
            }}
          />
        )}
      </Box>
      <ConfirmationDialog
        title={"Está seguro de querer eliminar la entidad?"}
        text={"Tenga en cuenta que esta acción no se puede deshacer"}
        open={dialogOpen}
        handleClose={handleDialogClose}
        handleAgree={handleDialogAgree}
      />
    </Box>
  );
}

export default EntityTable;
