import React, { useState } from "react";
import { ConfirmationDialog, Header, TableToolbar } from "../../../components";
import { Box, Button } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { esES, enUS } from "@mui/x-data-grid/locales";
import { deleteClient } from "../../../apis/ClientAPI.js";
import { getInfractions } from "../../../apis/InfractionAPI.js";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

function InfractionsTable () {
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
    loadInfractions();
    enqueueSnackbar(t("snackbarMessage.deleteInfraction"), { variant: "success" });
  };

  const navigate = useNavigate();

  //quitar el objeto y dejar el array vacio al cargar de la bd
  const [rows, setRows] = React.useState([]);

  //Cargar de la bd los clientes
  const loadInfractions = async () => {
    try {
      const data = await getInfractions();
      console.log(data);
      data.forEach((infraction) => {
        infraction.date = dayjs(infraction.date).format("DD/MM/YYYY");
        infraction.paid = infraction.paid ? t("types.paid") : "Pendiente";
      });
      setRows(data);
    } catch (error) {
      console.error("Error fetching infractions:", error);
    }
  };

  React.useEffect(() => {
    loadInfractions();
  }, []);

  const columns = [
    {
      field: "id",
      headerName: t("types.infractionCode"),
      flex: 1,
    },
    {
      field: "driverid",
      headerName: t("types.driverID"),
      flex: 1,
    },
    {
      field: "licenseid",
      headerName: t("types.licenseNumber"),
      flex: 1,
    },
    {
      field: "type",
      headerName: t("types.infractionTypes"),
      flex: 1,
    },
    {
      field: "date",
      headerName: t("types.date"),
      flex: 1,
    },
    {
      field: "pointsDeducted",
      headerName: t("types.pointsDeducted"),
      flex: 1,
    },
    {
      field: "paid",
      headerName: t("types.paid"),
      flex: 1,
    },
    {
      field: "address",
      headerName: t("types.address"),
      flex: 1,
    },
    {
      field: "description",
      headerName: t("types.description"),
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
            onClick={ () => navigate(`/infractions/${id}/edit`) }
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
        title={ t("infractions.title") }
        subtitle={ t("infractions.subtitle") }
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
          onClick={ () => navigate(`/infractions/new`) }
        >
          { t("infractions.newInfraction") }
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
                fileName={ t("infractions.title") }
              />
            ),
          } }
        />
      </Box>
      <ConfirmationDialog
        title={ t("infractions.deleteConfirmationTitle") }
        text={ t("infractions.deleteConfirmationText") }
        open={ dialogOpen }
        handleClose={ handleDialogClose }
        handleAgree={ handleDialogAgree }
      />
    </Box>
  );
}

export default InfractionsTable;
