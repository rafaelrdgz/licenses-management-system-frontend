import React, {useState} from "react";
import {ConfirmationDialog, Header, TableToolbar} from "../../../components";
import {Box, Button} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import {useNavigate} from "react-router-dom";
import {esES} from "@mui/x-data-grid/locales";
import {deleteLicense, getLicenses} from "../../../apis/LicensesAPI";
import { enqueueSnackbar, SnackbarProvider } from "notistack";


function LicensesTable() {
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
    enqueueSnackbar('Licencia eliminada', { variant: 'success' })
  };

  const navigate = useNavigate();

  //quitar el objeto y dejar el array vacio al cargar de la bd
  const [rows, setRows] = React.useState([]);

  //Cargar de la bd los conductores
  const loadLicenses = async () => {
    try {
      const data = await getLicenses();
      console.log(data);
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
      headerName: "Número de licencia",
      flex: 1,
    },
    {
      field: "driverId",
      headerName: "CI del conductor",
      flex: 1,
    },
    {
      field: "issueDate",
      headerName: "Fecha de emisión",
      flex: 1,
    },
    {
      field: "expirationDate",
      headerName: "Fecha de expiración",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Categoría",
      flex: 1,
    },
    {
      field: "restrictions",
      headerName: "Restricciones",
      flex: 1,
    },
    {
      field: "renewed",
      headerName: "Renovado",
      flex: 1,
    },
    {
      field: "points",
      headerName: "Puntos",
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
            onClick={() => navigate(`/licenses/${id}/edit`)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteOutlinedIcon/>}
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
      <SnackbarProvider maxSnack={3}/>
      <Header title={"LICENCIAS"} subtitle={"Información de las licencias"}/>
      <Button
        color="secondary"
        variant="contained"
        sx={{mb: "10px"}}
        onClick={() => navigate(`/licenses/new`)}
      >
        Nueva licencia
      </Button>
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
                fileName={"Licencias"}
              />
            ),
          }}
        />
      </Box>
      <ConfirmationDialog
        title={"Está seguro de querer eliminar la licencia?"}
        text={"Tenga en cuenta que esta acción no se puede deshacer"}
        open={dialogOpen}
        handleClose={handleDialogClose}
        handleAgree={handleDialogAgree}
      />
    </Box>
  );
}

export default LicensesTable;
