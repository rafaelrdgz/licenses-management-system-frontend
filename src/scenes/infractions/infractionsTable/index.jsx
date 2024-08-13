import React from "react";
import { ConfirmationDialog, Header, TableToolbar } from "../../../components";
import { Box, Button } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {
  DataGrid,
  GridActionsCellItem
} from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { esES } from '@mui/x-data-grid/locales';
import { useState } from "react";
import { enqueueSnackbar, SnackbarProvider } from "notistack";


function InfractionsTable() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogClose = () => setDialogOpen(false);
  const [selectedId, setSelectedId] = React.useState(null);

  const handleDeleteClick = (id) => () => {
    setDialogOpen(true);
    setSelectedId(id);
  };

  const handleDialogAgree = () => {
    setDialogOpen(false);
    setRows(rows.filter((row) => row.id !== selectedId));
    //Eliminar de la bd

    enqueueSnackbar('Infracción eliminada', { variant: 'success' })
  };

    const navigate = useNavigate();

    //quitar el objeto y dejar el array vacio al cargar de la bd
    const [rows, setRows] = React.useState([{
      id: '135135135135',
      driverId: '135135135351',
      licenseId: '135135135135',	
      type: 'leve',
      date: '2021-10-10',
      pointsdeducted: 5,
      paid: 'si',
      address: 'dsadsadsa dsadsadsadsa dsadsad 131 saddsa',
      description: 'sadsa dsadsa g thgfhgf gfhfdfsadsadsad',
    }]);
  
    //Cargar de la bd los clientes
    const loadClients = async () => {
      /*await axios.get("").then((res) => {
        setRows(res.data);
      });*/
    };
  
    React.useEffect(() => {
      loadClients();
    }, []);
  
    const columns = [
      {
        field: "id",
        headerName: "Código",
        flex: 1,
      },
      {
        field: "driverId",
        headerName: "CI del conductor",
        flex: 1,
      },
      {
        field: "licenseId",
        headerName: "Número de licencia",
        flex: 1,
      },
      {
        field: "type",
        headerName: "Tipo",
        flex: 1,
      },
      {
        field: "date",
        headerName: "Fecha",
        flex: 1,
      },
      {
        field: "pointsdeducted",
        headerName: "Puntos deducidos",
        flex: 1,
      },
      {
        field: "paid",
        headerName: "Pagado",
        flex: 1,
      },
      {
        field: "address",
        headerName: "Dirección",
        flex: 1,
      },
      {
        field: "description",
        headerName: "Descripción",
        flex: 1,
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Acciones",
        flex: .5,
        cellClassName: "actions",
        getActions: ({ id }) => {
          return [
            <GridActionsCellItem
              icon={<EditOutlinedIcon />}
              label="Edit"
              className="textPrimary"
              onClick={() => navigate(`/infractions/${id}/edit`)}
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
        <SnackbarProvider maxSnack={3}/>
        <Header
          title={"INFRACCIONES"}
          subtitle={"Información de las infracciones"}
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
          <Button color="secondary" variant="contained" sx={{mb: '10px'}} onClick={() => navigate(`/infractions/new`)}>
            Nueva infracción
          </Button>
          <DataGrid
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 25, page: 0 },
              },
            }}
            rows={rows}
            columns={columns}
            components={{
              Toolbar: () => <TableToolbar columns={columns} rows={rows} fileName={'Infracciones'} />,
            }}
          />
        </Box>
        <ConfirmationDialog
        title={"Está seguro de querer eliminar la infracción?"}
        text={"Tenga en cuenta que esta acción no se puede deshacer"}
        open={dialogOpen}
        handleClose={handleDialogClose}
        handleAgree={handleDialogAgree}
      />
      </Box>
    );
  }

export default InfractionsTable
