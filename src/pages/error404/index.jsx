import React from "react";
import { Typography } from "@mui/material";

import { useTranslation } from "react-i18next";

function Error404 () {

  const { t } = useTranslation();

  return (
    <div style={ { textAlign: "center", marginTop: "20%" } }>
      <Typography variant="h1">Error 404</Typography>
      <Typography variant="body1" mt={ 1 }>
        { t("error.error404") }
      </Typography>
    </div>
  );
}

export default Error404;
