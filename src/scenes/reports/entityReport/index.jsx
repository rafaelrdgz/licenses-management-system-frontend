import React from "react";
import { Header } from "../../../components";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { TextField } from "../../../components";
import { Formik } from "formik";
import * as yup from "yup";
import { isValidEntity } from "../../../utils/validations.js";
import { useState } from "react";
import { tokens } from "../../../theme.js";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import jsPDF from "jspdf";


function EntityReport() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [search, setSearch] = useState(false);

  const [info, setInfo] = useState({
    entityCode: "",
    name: 'rafael',
    type: 'autoescuela',
    address: 'dsadsa dsadsadsa',
    phone: '54354543',
    email: 'dasdsadsadsadsa',
    directorName: 'sadsasadsadsad'
  });

  const initialValues = {
    entityCode: info.entityCode,
  };

  const checkoutSchema = yup.object().shape({
    entityCode: yup
      .string()
      .matches(/^[0-9]+$/, "El código debe ser un número")
      .required("El código es requerido")
      .min(6, "El código debe tener al menos 6 caracteres")
      .max(16, "El código debe tener menos de 16 caracteres")
      .test(
        "is-valid-entity",
        "El código de la entidad no se encuentra en el sistema",
        isValidEntity
      ),
  });

  const handleFormSubmit = async (values) => {
    //se trae de la bd los datos de la entidad y se guardan con setInfo
    console.log(values.entityCode);
    setSearch(true);
    setInfo({ ...info, entityCode: values.entityCode });
  };

  const handleExportPdf = () => {
    const doc = new jsPDF();
  
    doc.setFontSize(18);
    doc.text("Ficha de Entidad Asociada", 20, 20);
  
    doc.setFontSize(12);
    doc.text(`Código de entidad: ${info.entityCode}`, 20, 40);
    doc.text(`Nombre: ${info.name}`, 20, 50);
    doc.text(`Tipo: ${info.type}`, 20, 60);
    doc.text(`Dirección: ${info.address}`, 20, 70);
    doc.text(`Teléfono: ${info.phone}`, 20, 80);
    doc.text(`Email: ${info.email}`, 20, 90);
    doc.text(`Nombre del director: ${info.directorName}`, 20, 100);
  
    doc.save("Ficha de Entidad.pdf");
  };
  

  return (
    <Box m={"20px"}>
      <Header
        title={"REPORTES"}
        subtitle={"Ficha de una Entidad Asociada"}
      />
      {search && (<Button sx={{mb: '10px'}} color="secondary" variant="contained" onClick={handleExportPdf}>
        Exportar PDF
      </Button>)}
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Código de entidad"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.entityCode}
                name="entityCode"
                error={touched.entityCode && errors.entityCode}
                helperText={touched.entityCode && errors.entityCode}
                sx={{ gridColumn: "span 2" }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              </LocalizationProvider>
            </Box>
            <Button
              sx={{ mt: "10px" }}
              type="submit"
              color="secondary"
              variant="contained"
            >
              Buscar
            </Button>
          </form>
        )}
      </Formik>

      {search && (<div>
        <Typography
          variant="h4"
          sx={{ mt: "20px", mb: "10px" }}
          color={colors.gray[100]}
        >
          {" "}
            Código: {info.entityCode}
        </Typography>
        <Typography
          variant="h4"
          sx={{ mt: "20px", mb: "10px" }}
          color={colors.gray[100]}
        >
          {" "}
            Nombre: {info.name}
        </Typography>
        <Typography
          variant="h4"
          sx={{ mt: "20px", mb: "10px" }}
          color={colors.gray[100]}
        >
          {" "}
            Tipo: {info.type}
        </Typography>
        <Typography
          variant="h4"
          sx={{ mt: "20px", mb: "10px" }}
          color={colors.gray[100]}
        >
          {" "}
            Dirección: {info.address}
        </Typography>
        <Typography
          variant="h4"
          sx={{ mt: "20px", mb: "10px" }}
          color={colors.gray[100]}
        >
          {" "}
            Teléfono: {info.phone}
        </Typography>
        <Typography
          variant="h4"
          sx={{ mt: "20px", mb: "10px" }}
          color={colors.gray[100]}
        >
          {" "}
            Email: {info.email}
        </Typography>
        <Typography
          variant="h4"
          sx={{ mt: "20px", mb: "10px" }}
          color={colors.gray[100]}
        >
          {" "}
            Nombre del director: {info.directorName}
        </Typography>
      </div>)}
    </Box>
  );
}

export default EntityReport;
