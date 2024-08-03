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


function ExamsTable() {

  const navigate = useNavigate();

  //quitar el objeto y dejar el array vacio al cargar de la bd
  const [rows, setRows] = React.useState([{
    id: '213',
    personID: '213',
    code: '213',
    entityName: 'Rafael Rodriguez Perez',
    examinerName: '55362350',
    type: 'practico',
    result: 'aprobado',
    date: '2021-10-10'
  }]);

  //Cargar de la bd los examenes
  const loadExams = async () => {
    /*await axios.get("").then((res) => {
      setRows(res.data);
    });*/
  };

  React.useEffect(() => {
    loadExams();
  }, []);

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
    //eleminar de la bd el examen
  };

  const columns = [
    {
      field: "personID",
      headerName: "CI cliente",
      flex: 1,
    },
    {
      field: "code",
      headerName: "Código de exámen",
      flex: 1,
    },
    {
      field: "entityName",
      headerName: "Nombre entidad",
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
      flex: 1,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditOutlinedIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => navigate(`/exams/${id}/edit`)}
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
        title={"EXAMEN"}
        subtitle={"Información de los exámenes"}
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
        <Button color="secondary" variant="contained" sx={{mb: '10px'}} onClick={() => navigate(`/exams/new`)}>
          Insertar nuevo exámen
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
            Toolbar: () => <TableToolbar columns={columns} rows={rows} fileName={'Entidades'} />,
          }}
        />
      </Box>
    </Box>
  );
}

export default ExamsTable;
