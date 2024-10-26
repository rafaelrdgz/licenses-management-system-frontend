import React from "react";
import { Typography } from "@mui/material";

function Error404() {
  return (
    <div style={{ textAlign: "center", marginTop: "20%" }}>
      <Typography variant="h1">Error 404</Typography>
      <Typography variant="body1" mt={1}>
        La página que estás buscando no existe.
      </Typography>
    </div>
  );
}

export default Error404;
