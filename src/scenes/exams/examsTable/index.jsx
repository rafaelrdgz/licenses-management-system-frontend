import { Box, Button } from "@mui/material";
import React from "react";
import { Header } from "../../../components";
import { useNavigate } from "react-router-dom";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";


function ExamsTable() {
  const navigate = useNavigate();
  return (
    <Box m='20px'>
      <Header title="EXAMEN" subtitle="Información de los exámenes" />
      <Box
        sx={{
          height: 650,
          width: "100%",
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
          sx={{ mb: "10px" }}
          onClick={() => navigate(`/exams/new`)}
        >
          Insertar nuevo exámen
        </Button>

      </Box>
    </Box>
  );
}

export default ExamsTable;
