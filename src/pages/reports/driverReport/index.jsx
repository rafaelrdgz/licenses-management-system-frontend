import React, { useState } from "react";
import { Header, TableToolbar, TextField } from "../../../components";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { existsDriverId, isValidIdDate } from "../../../utils/validations.js";
import { DataGrid } from "@mui/x-data-grid";
import { esES, enUS } from "@mui/x-data-grid/locales";
import { tokens } from "../../../theme.js";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { fetchDriverPdf, getDriverReport } from "../../../apis/ReportsAPI.js";
import { useTranslation } from "react-i18next";
import LoadingButton from "@mui/lab/LoadingButton";

function DriverReport() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language; // Obtener el idioma actual

  const localeText =
    currentLanguage === "es"
      ? esES.components.MuiDataGrid.defaultProps.localeText
      : enUS.components.MuiDataGrid.defaultProps.localeText;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [search, setSearch] = useState(false);
  const [noDataInfractions, setNoDataInfractions] = useState(false);
  const [noDataLicenses, setNoDataLicenses] = useState(false);
  const [info, setInfo] = useState({
    id: "",
    name: "",
    lastNames: "",
    address: "",
    phoneNumber: "",
    licenseStatus: "",
    licensesRows: [],
    infractionsRows: [],
  });

  const initialValues = {
    id: info.id,
  };

  const checkoutSchema = yup.object().shape({
    id: yup
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
        existsDriverId
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
      field: "pointsDeducted",
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
      field: "category",
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
    const response = await getDriverReport(values.id);
    console.log(response);
    if (response.infractionsRows === null) {
      setNoDataInfractions(true);
    }
    if (response.licensesRows === null) {
      setNoDataLicenses(true);
      return;
    }
    //console.log(values);
    setSearch(true);
    setInfo(response);
  };

  const [loading, setLoading] = useState(false);

  const handleExportPdf = async () => {
    setLoading(true);
    await fetchDriverPdf(info);
    setLoading(false);
  };

  return (
    <Box m={"20px"}>
      <Header
        title={"REPORTES"}
        subtitle={"Ficha de un Conductor Determinado"}
      />
      {search && (
        <LoadingButton
          sx={{ mb: "10px" }}
          loading={loading}
          color="secondary"
          variant="contained"
          onClick={handleExportPdf}
        >
          Exportar PDF
        </LoadingButton>
      )}
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
                value={values.id}
                name="id"
                error={touched.id && !!errors.id}
                helperText={touched.id && errors.id}
                sx={{ gridColumn: "span 2" }}
              />
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
              ></LocalizationProvider>
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

      {search && (
        <div>
          <Typography
            variant="h4"
            sx={{ mt: "20px", mb: "10px" }}
            color={colors.gray[100]}
          >
            {" "}
            Número de identidad: {info.id}
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
            Télefono: {info.phoneNumber}
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
              localeText={localeText}
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
          {noDataInfractions && (
            <Typography
              variant="h6"
              color={colors.gray[100]}
              sx={{ mt: "10px" }}
            >
              El conductor no ha cometido infracciones
            </Typography>
          )}

          {!noDataInfractions && (
            <>
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
                  localeText={localeText}
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
            </>
          )}
        </div>
      )}
    </Box>
  );
}

export default DriverReport;
