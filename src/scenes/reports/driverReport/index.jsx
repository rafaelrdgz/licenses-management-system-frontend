import React from "react";
import { Header, TableToolbar } from "../../../components";
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
import { isValidIdDate, isValidPersonID } from "../../../utils/validations.js";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";
import { tokens } from "../../../theme.js";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'

function DriverReport() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [search, setSearch] = useState(false);

  const [info, setInfo] = useState({
    personId: "",
    name: 'rafael',
    lastNames: 'rodriguez perez',
    address: 'dsadsa dsadsadsa',
    phone: '54354543',
    licenseStatus: 'revocada',
    infractionsRows: [{
      id: '135135135135',
      type: 'leve',
      date: '2021-10-10',
      pointsdeducted: 5,}],
    licensesRows: [{
      id: "135135135351",
      type: "A",
      issueDate: "2021-10-10",
      expirationDate: "2021-10-10",
    }],
  });

  const initialValues = {
    personId: info.personId,
  };

  const checkoutSchema = yup.object().shape({
    personId: yup
      .string()
      .matches(
        /^[0-9]+$/,
        "El número de indentificación no debe contener letras"
      )
      .required("El número de indentificación es requerido")
      .min(11, "El número de indentificación debe tener 11 dígitos")
      .max(11, "El número de indentificación debe tener 11 dígitos")
      .test(
        "is-valid-id",
        "El número de indentificación no es válido",
        isValidIdDate
      )
      .test(
        "is-valid-person",
        "El número de identificación no se encuentra en el sistema",
        isValidPersonID
      ),
  });

  const infractionsColumns = [
    {
      field: "id",
      headerName: "Código",
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
  ];

  const licensesColumns = [
    {
      field: "id",
      headerName: "Número de licencia",
      flex: 1,
    },
    {
      field: "type",
      headerName: "Tipo",
      flex: 0.5,
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

  ];

  const handleFormSubmit = async (values) => {
    //se trae de la bd los datos del conductor y se guardan con setInfo
    console.log(values.personId);
    setSearch(true);
    setInfo({ ...info, personId: values.personId });
  };

  const handleExportPdf = () => {
    const doc = new jsPDF();
  
    doc.setFontSize(18);
    doc.text("Ficha de Conductor", 20, 20);
  
    doc.setFontSize(12);
    doc.text(`Número de identidad: ${info.personId}`, 20, 40);
    doc.text(`Nombre: ${info.name}`, 20, 50);
    doc.text(`Apellidos: ${info.lastNames}`, 20, 60);
    doc.text(`Dirección: ${info.address}`, 20, 70);
    doc.text(`Teléfono: ${info.phone}`, 20, 80);
    doc.text(`Estado de licencia: ${info.licenseStatus}`, 20, 90);
  
    doc.setFontSize(16);
    doc.text("Licencias emitidas", 20, 100);
  
    const licenses = info.licensesRows.map((license) => [
      license.id,
      license.type,
      license.issueDate,
      license.expirationDate,
    ]);
  
    autoTable(doc, {
      head: [["Número de licencia", "Tipo", "Fecha de emisión", "Fecha de expiración"]],
      body: licenses,
      startY: 110,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] },
    });
  
    doc.addPage();
    doc.setFontSize(16);
    doc.text("Infracciones registradas", 20, 20);
  
    const infractions = info.infractionsRows.map((infraction) => [
      infraction.id,
      infraction.type,
      infraction.date,
      infraction.pointsdeducted,
    ]);
  
    autoTable(doc, {
      head: [["Código", "Tipo", "Fecha", "Puntos deducidos"]],
      body: infractions,
      startY: 30,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] },
    });
  
    doc.save("Ficha de Conductor.pdf");
  };
  

  return (
    <Box m={"20px"}>
      <Header
        title={"REPORTES"}
        subtitle={"Ficha de un Conductor Determinado"}
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
                label="Número de identidad"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.personId}
                name="personId"
                error={touched.personId && errors.personId}
                helperText={touched.personId && errors.personId}
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
          Número de identidad: {info.personId}
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
          Apellidos: {info.lastNames}
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
          Télefono: {info.phone}
        </Typography>
        <Typography
          variant="h4"
          sx={{ mt: "20px", mb: "10px" }}
          color={colors.gray[100]}
        >
          {" "}
          Estado de licencia: {info.licenseStatus}
        </Typography>
        <Typography
          variant="h4"
          sx={{ mt: "40px", mb: "10px" }}
          color={colors.gray[100]}
        >
          {" "}
          Licencias emitidas{" "}
        </Typography>
        <Box
          sx={{
            height: "40vh",
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
            rows={info.licensesRows}
            columns={licensesColumns}
            components={{
              Toolbar: () => (
                <TableToolbar
                  columns={licensesColumns}
                  rows={info.licensesRows}
                  fileName={"Licencias"}
                />
              ),
            }}
          />
        </Box>
        <Typography
          variant="h4"
          sx={{ mt: "20px", mb: "10px" }}
          color={colors.gray[100]}
        >
          {" "}
          Infracciones registradas{" "}
        </Typography>
        <Box
          sx={{
            height: "40vh",
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
            rows={info.infractionsRows}
            columns={infractionsColumns}
            components={{
              Toolbar: () => (
                <TableToolbar
                  columns={infractionsColumns}
                  rows={info.infractionsRows}
                  fileName={"Infracciones"}
                />
              ),
            }}
          />
        </Box>
      </div>)}
    </Box>
  );
}

export default DriverReport;
