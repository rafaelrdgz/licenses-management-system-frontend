import { Box, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

import { useTranslation } from "react-i18next";

const reports = [
  {
    name: "center",
    url: "/center",
  },
  {
    name: "driverInfo",
    url: "/reports/driver",
  },
  {
    name: "entityInfo",
    url: "/reports/entity"
  },
  {
    name: "issuedLicenses",
    url: "/reports/issuedLicenses",
  },
  {
    name: "examsTaken",
    url: "/reports/examsPerformed",
  },
  {
    name: "registeredInfractions",
    url: "/reports/registeredInfractions",
  },
  {
    name: "infractionsPerTypeInYear",
    url: "/reports/infractionsByType",
  },
  {
    name: "driversWithExpiredLicenses",
    url: "/reports/expiredLicenses",
  },
];

function Reports () {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const { t } = useTranslation();

  return (
    <Box m={ "20px" }>
      <Header title={ t("reports.title") } subtitle={ t("reports.subtitle") } />
      <List>
        { reports.map((report, index) => (
          <ListItem
            button
            key={ index }
            onClick={ () => navigate(report.url) }
            sx={ {
              backgroundColor: colors.primary[400],
              mb: 1,
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.08)",
              },
            } }
          >
            <ListItemText primary={ t(`reports.${report.name}${report.name === "driverInfo" || report.name === "infractionsPerTypeInYear" ? ".subtitle" : ""
              }`) } />
          </ListItem>
        )) }
      </List>
    </Box>
  );
}

export default Reports;
