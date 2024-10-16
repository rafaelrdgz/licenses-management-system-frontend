import React, { useState } from "react";
import { ConfirmationDialog, Header, TableToolbar } from "../../../components";
import { Box } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { esES, enUS } from "@mui/x-data-grid/locales";
import { deleteDriver, getDrivers } from "../../../apis/DriversAPI";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

function DriversTable() {
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
    await deleteDriver(selectedId);
    loadDrivers();
    enqueueSnackbar("Conductor eliminado", { variant: "success" });
  };

  const navigate = useNavigate();

  //quitar el objeto y dejar el array vacio al cargar de la bd
  const [rows, setRows] = React.useState([]);

  //Cargar de la bd los conductores
  const loadDrivers = async () => {
    try {
      const data = await getDrivers();
      console.log(data);
      data.forEach((driver) => {
        driver.bornDate = dayjs(driver.bornDate).format("DD/MM/YYYY");
      });
      setRows(data);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  React.useEffect(() => {
    loadDrivers();
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "CI conductor",
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
      field: "licenseStatus",
      headerName: "Estado de licencia",
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
            onClick={() => navigate(`/drivers/${id}/edit`)}
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
        title={"CONDUCTORES"}
        subtitle={"Información de los conductores"}
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
                fileName={"Conductores"}
              />
            ),
          }}
        />
      </Box>
      <ConfirmationDialog
        title={"Está seguro de querer eliminar el conductor?"}
        text={"Tenga en cuenta que esta acción no se puede deshacer"}
        open={dialogOpen}
        handleClose={handleDialogClose}
        handleAgree={handleDialogAgree}
      />
    </Box>
  );
}

export default DriversTable;
