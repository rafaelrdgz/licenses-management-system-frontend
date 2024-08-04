import React from "react";
import { Header, TableToolbar } from "../../../components";
import { Box, Button } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {
  DataGrid,
  GridActionsCellItem
} from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { esES } from '@mui/x-data-grid/locales';


function LicencesTable() {
    const navigate = useNavigate();

    //quitar el objeto y dejar el array vacio al cargar de la bd
    const [rows, setRows] = React.useState([{
      id: '135135135351',
      driverId: '135135135351',
      type: 'A',
      issueDate: '2021-10-10',
      expirationDate: '2021-10-10',
      category: 'moto',
      restrictions: 'dsadsadsa dsadsadsadsa dsadsad 131 saddsa',
      renewed: 'si',
    }]);
  
    //Cargar de la bd los conductores
    const loadClients = async () => {
      /*await axios.get("").then((res) => {
        setRows(res.data);
      });*/
    };
  
    React.useEffect(() => {
      loadClients();
    }, []);
  
    const handleDeleteClick = (id) => () => {
      setRows(rows.filter((row) => row.id !== id));
      //eleminar de la bd el conductores
    };
  
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
        field: "type",
        headerName: "Tipo",
        flex: .5,
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
              onClick={() => navigate(`/licences/${id}/edit`)}
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
        <Header
          title={"LICENCIAS"}
          subtitle={"Información de las licencias"}
        />
        <Button color="secondary" variant="contained" sx={{mb: '10px'}} onClick={() => navigate(`/licences/new`)}>
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
                paginationModel: { pageSize: 25, page: 0 },
              },
            }}
            rows={rows}
            columns={columns}
            components={{
              Toolbar: () => <TableToolbar columns={columns} rows={rows} fileName={'Licencias'} />,
            }}
          />
        </Box>
      </Box>
    );
  }

export default LicencesTable
