import React from "react";
import {Header, TableToolbar} from "../../../components";
import {Box, Button} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import {useNavigate} from "react-router-dom";
import {esES} from "@mui/x-data-grid/locales";
import {getExams} from "../../../apis/ExamsAPI.js";
import { enqueueSnackbar, SnackbarProvider } from "notistack";


function ExamsTable() {
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
      headerName: "CI cliente",
      flex: 1,
    },
    {
      field: "id",
      headerName: "Código de exámen",
      flex: 1,
    },
    {
      field: "entityCode",
      headerName: "Código de entidad",
      flex: 1,
    },
    {
      field: "examinerName",
      headerName: "Nombre del examinador",
      flex: 1,
    },
    {
      field: "type",
      headerName: "Tipo",
      flex: 1,
    },
    {
      field: "result",
      headerName: "Resultado",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Fecha",
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      flex: 0.5,
      cellClassName: "actions",
      getActions: ({id}) => {
        return [
          <GridActionsCellItem
            icon={<EditOutlinedIcon/>}
            label="Edit"
            className="textPrimary"
            onClick={() => navigate(`/exams/${id}/edit`)}
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
      <SnackbarProvider maxSnack={3}/>
      <Header title={"EXAMENES"} subtitle={"Información de los exámenes"}/>
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
          sx={{mb: "10px"}}
          onClick={() => navigate(`/exams/new`)}
        >
          Nuevo exámen
        </Button>
        <DataGrid
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          initialState={{
            pagination: {
              paginationModel: {pageSize: 25, page: 0},
            },
          }}
          rows={rows}
          columns={columns}
          components={{
            Toolbar: () => (
              <TableToolbar
                columns={columns}
                rows={rows}
                fileName={"Exámenes"}
              />
            ),
          }}
        />
      </Box>
      {/*<ConfirmationDialog*/}
      {/*  title={"Está seguro de querer eliminar el exámen?"}*/}
      {/*  text={"Tenga en cuenta que esta acción no se puede deshacer"}*/}
      {/*  open={dialogOpen}*/}
      {/*  handleClose={handleDialogClose}*/}
      {/*  handleAgree={handleDialogAgree}*/}
      {/*/>*/}
    </Box>
  );
}

export default ExamsTable;
