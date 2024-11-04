import React from "react";
import { Header, TableToolbar } from "../../../components";
import { Box, Button } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { esES, enUS } from "@mui/x-data-grid/locales";
import { getExams } from "../../../apis/ExamsAPI.js";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

function ExamsTable () {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language; // Obtener el idioma actual

  const localeText =
    currentLanguage === "es"
      ? esES.components.MuiDataGrid.defaultProps.localeText
      : enUS.components.MuiDataGrid.defaultProps.localeText;

  // const [dialogOpen, setDialogOpen] = useState(false);
  // const handleDialogClose = () => setDialogOpen(false);
  const [selectedId, setSelectedId] = React.useState(null);

  // const handleDeleteClick = (id) => () => {
  //   setDialogOpen(true);
  //   setSelectedId(id);
  // };

  // const handleDialogAgree = async () => {
  //   setDialogOpen(false);
  //   await deleteExam(selectedId);
  //   loadExams();
  //   enqueueSnackbar("Examen eliminado correctamente", { variant: "success" });
  // };

  const navigate = useNavigate();

  const [rows, setRows] = React.useState([]);

  //Cargar de la bd los examenes
  const loadExams = async () => {
    try {
      const data = await getExams();
      console.log(data);
      data.forEach((exam) => {
        exam.date = dayjs(exam.date).format("DD/MM/YYYY");
      });
      setRows(data);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  React.useEffect(() => {
    loadExams();
  }, []);

  const columns = [
    {
      field: "personId",
      headerName: t("types.clientID"),
      flex: 1,
    },
    {
      field: "id",
      headerName: t("types.examCode"),
      flex: 1,
    },
    {
      field: "entityCode",
      headerName: t("types.entityCode"),
      flex: 1,
    },
    {
      field: "examinerName",
      headerName: t("types.examinerName"),
      flex: 1,
    },
    {
      field: "type",
      headerName: t("types.type"),
      flex: 1,
    },
    {
      field: "result",
      headerName: t("types.result"),
      flex: 1,
    },
    {
      field: "date",
      headerName: t("types.date"),
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
            onClick={ () => navigate(`/exams/${id}/edit`) }
            color="inherit"
          />,
          // <GridActionsCellItem
          //   icon={<DeleteOutlinedIcon />}
          //   label="Delete"
          //   onClick={handleDeleteClick(id)}
          //   color="inherit"
          // />,
        ];
      },
    },
  ];

  return (
    <Box m="20px">
      <SnackbarProvider maxSnack={ 3 } />
      <Header title={ t("exams.title") } subtitle={ t("exams.subtitle") } />
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
          onClick={ () => navigate(`/exams/new`) }
        >
          { t("exams.newExam") }
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
                fileName={ t("exams.title") }
              />
            ),
          } }
        />
      </Box>
      {/*<ConfirmationDialog*/ }
      {/*  title={"Está seguro de querer eliminar el exámen?"}*/ }
      {/*  text={"Tenga en cuenta que esta acción no se puede deshacer"}*/ }
      {/*  open={dialogOpen}*/ }
      {/*  handleClose={handleDialogClose}*/ }
      {/*  handleAgree={handleDialogAgree}*/ }
      {/*/>*/ }
    </Box>
  );
}

export default ExamsTable;
