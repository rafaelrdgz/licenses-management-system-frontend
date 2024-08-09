import { Box, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const reports = [
  {
    name: "Ficha del Centro",
    url: "/center",
  },
  {
    name: "Ficha de un Conductor Determinado",
    url: "/reports/driver",
  },
  { name: "Ficha de una Entidad Asociada",
    url: "/reports/entity" },
  {
    name: "Reporte de Licencias Emitidas en un Período de Tiempo",
    url: "/reports/issuedLicenses",
  },
  {
    name: "Reporte de Exámenes Realizados en un Período de Tiempo",
    url: "/reports/examsPerformed",
  },
  {
    name: "Reporte de Infracciones Registradas en un Período de Tiempo",
    url: "/reports/registeredInfractions",
  },
  {
    name: "Reporte Consolidado de Infracciones por Tipo en un Año Determinado",
    url: "/reporte/infracciones-consolidadas",
  },
  {
    name: "Reporte de Conductores con Licencias Vencidas en un Período de Tiempo",
    url: "/reports/expiredLicenses",
  },
];

function Reports() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  return (
    <Box m={"20px"}>
      <Header title={"REPORTES"} subtitle={"Listado de reportes disponibles"} />
      <List>
        {reports.map((report, index) => (
          <ListItem
            button
            key={index}
            onClick={() => navigate(report.url)}
            sx={{
              backgroundColor: colors.primary[400],
              mb: 1,
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.08)",
              },
            }}
          >
            <ListItemText primary={report.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Reports;
