import React, { useState } from "react";
import { ConfirmationDialog, Header, TableToolbar } from "../../../components";
import { Box, Button } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { esES, enUS } from "@mui/x-data-grid/locales";
import { deleteLicense, getLicenses } from "../../../apis/LicensesAPI";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

function LicensesTable () {
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
    await deleteLicense(selectedId);
    loadLicenses();
    enqueueSnackbar(t("snackbarMessage.deleteLicense"), { variant: "success" });
  };

  const navigate = useNavigate();

  //quitar el objeto y dejar el array vacio al cargar de la bd
  const [rows, setRows] = React.useState([]);

  //Cargar de la bd los conductores
  const loadLicenses = async () => {
    try {
      const data = await getLicenses();
      console.log(data);
      data.forEach((license) => {
        license.issueDate = dayjs(license.issueDate).format("DD/MM/YYYY");
        license.expirationDate = dayjs(license.expirationDate).format(
          "DD/MM/YYYY"
        );
        license.renewed = license.renewed ? t("types.renewed") : t("types.notRenewed");
      });
      setRows(data);
    } catch (error) {
      console.error("Error fetching licenses:", error);
    }
  };

  React.useEffect(() => {
    loadLicenses();
  }, []);

  const columns = [
    {
      field: "id",
      headerName: t("types.licenseNumber"),
      flex: 1,
    },
    {
      field: "driverId",
      headerName: t("types.driverID"),
      flex: 1,
    },
    {
      field: "issueDate",
      headerName: t("types.issueDate"),
      flex: 1,
    },
    {
      field: "expirationDate",
      headerName: t("types.expirationDate"),
      flex: 1,
    },
    {
      field: "category",
      headerName: t("types.category"),
      flex: 1,
    },
    {
      field: "restrictions",
      headerName: t("types.restrictions"),
      flex: 1,
    },
    {
      field: "renewed",
      headerName: t("types.renewed"),
      flex: 1,
    },
    {
      field: "points",
      headerName: t("types.points"),
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
            onClick={ () => navigate(`/licenses/${id}/edit`) }
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
      <Header title={ t("licenses.title") } subtitle={ t("licenses.subtitle") } />
      <Button
        color="secondary"
        variant="contained"
        sx={ { mb: "10px" } }
        onClick={ () => navigate(`/licenses/new`) }
      >
        { t("licenses.newLicense") }
      </Button>
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
                fileName={ t("licenses.title") }
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

export default LicensesTable;
