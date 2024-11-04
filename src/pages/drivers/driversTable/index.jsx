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

function DriversTable () {
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
    await deleteDriver(selectedId);
    loadDrivers();
    enqueueSnackbar(t("snackbarMessage.deleteDriver"), { variant: "success" });
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
      headerName: t("types.driverID"),
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
      field: "licenseStatus",
      headerName: t("types.licenseStatus"),
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
            icon={ <EditOutlinedIcon /> }
            label={ t("actions.edit") }
            className="textPrimary"
            onClick={ () => navigate(`/drivers/${id}/edit`) }
            color="inherit"
          />,
          <GridActionsCellItem
            icon={ <DeleteOutlinedIcon /> }
            label={ t("actions.delete") }
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
        title={ t("drivers.title") }
        subtitle={ t("drivers.subtitle") }
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
                fileName={ t("drivers.title") }
              />
            ),
          } }
        />
      </Box>
      <ConfirmationDialog
        title={ t("drivers.deleteConfirmationTitle") }
        text={ t("drivers.deleteConfirmationText") }
        open={ dialogOpen }
        handleClose={ handleDialogClose }
        handleAgree={ handleDialogAgree }
      />
    </Box>
  );
}

export default DriversTable;
