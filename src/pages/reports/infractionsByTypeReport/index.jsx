import React, { useState } from "react";
import { Header, TableToolbar } from "../../../components";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { DataGrid } from "@mui/x-data-grid";
import { esES, enUS } from "@mui/x-data-grid/locales";
import { tokens } from "../../../theme.js";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {
  fetchInfractionsByTypeAndYearPdf,
  getInfractionsByType,
  getInfractionsByYear,
} from "../../../apis/ReportsAPI.js";
import { useTranslation } from "react-i18next";
import "dayjs/locale/es-us.js";
import { LoadingButton } from "@mui/lab";

function InfractionsByTypeReport() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language; // Obtener el idioma actual

  const localeText =
    currentLanguage === "es"
      ? esES.components.MuiDataGrid.defaultProps.localeText
      : enUS.components.MuiDataGrid.defaultProps.localeText;

  const adapterLocale = currentLanguage === "es" ? "es-us" : "en";

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [noData, setNoData] = useState(false);

  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);

  const [info, setInfo] = useState({
    year: null,
    typesRows: [],
    infractionsRows: [],
  });

  const initialValues = {
    year: info.year,
  };

  const checkoutSchema = yup.object().shape({
    year: yup
      .date()
      .required("El año es requerido")
      .min(dayjs("1-1-2015"), "El año debe ser mayor a 2015")
      .max(dayjs(), "El año no puede ser mayor al actual"),
  });

  const typesColumns = [
    {
      field: "id",
      headerName: "Tipo",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Cantidad",
      flex: 1,
    },
    {
      field: "pointsDeducted",
      headerName: "Puntos totales deducidos",
      flex: 1,
    },
    {
      field: "infractionsPaid",
      headerName: "Multas pagadas",
      flex: 1,
    },
    {
      field: "infractionsNoPaid",
      headerName: "Multas pendientes",
      flex: 1,
    },
  ];

  const infractionsColumns = [
    {
      field: "id",
      headerName: "Código de infracción",
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
    {
      field: "paid",
      headerName: "Estado del pago",
      flex: 1,
    },
  ];

  const handleFormSubmit = async (values) => {
    const types = await getInfractionsByType(values.year.$y);
    const result = await getInfractionsByYear(values.year.$y);
    result.forEach((infraction) => {
      infraction.date = dayjs(infraction.date).format("DD/MM/YYYY");
    });
    console.log(types);
    if (types === null) {
      setNoData(true);
      return;
    }
    setInfo({
      year: values.year.$y,
      typesRows: types,
      infractionsRows: result,
    });
    setSearch(true);
    setNoData(false);
  };

  const handleExportPdf = async () => {
    setLoading(true);
    await fetchInfractionsByTypeAndYearPdf(info);
    setLoading(false);
  };

  return (
    <Box m={"20px"}>
      <Header
        title={"REPORTES"}
        subtitle={
          "Reporte Consolidado de Infracciones por Tipo en un Año Determinado"
        }
      />
      {search && (
        <LoadingButton
          loading={loading}
          sx={{ mb: "10px" }}
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
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale={adapterLocale}
              >
                <DatePicker
                  value={values.year}
                  onChange={(newValue) =>
                    handleChange({
                      target: { name: "year", value: newValue },
                    })
                  }
                  slotProps={{
                    textField: {
                      error: Boolean(touched.year && errors.year),
                      helperText: touched.year && errors.year,
                    },
                  }}
                  minDate={dayjs("1-1-2015")}
                  maxDate={dayjs()}
                  sx={{ gridColumn: "span 2" }}
                  label={"Año"}
                  views={["year"]}
                />
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

      {noData && (
        <Typography variant="h6" color="error" sx={{ mt: "10px" }}>
          No hay registros para mostrar
        </Typography>
      )}

      {search && (
        <div>
          <Typography
            variant="h4"
            sx={{ mt: "20px", mb: "10px" }}
            color={colors.gray[100]}
          >
            {" "}
            Año: {info.year}
          </Typography>
          <Typography
            variant="h4"
            sx={{ mt: "20px", mb: "10px" }}
            color={colors.gray[100]}
          >
            {" "}
            Resumen por tipo{" "}
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
              rows={info.typesRows}
              columns={typesColumns}
              components={{
                Toolbar: () => (
                  <TableToolbar
                    columns={typesColumns}
                    rows={info.typesRows}
                    fileName={"Tipos de Infracciones"}
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
              height: "70vh",
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
        </div>
      )}
    </Box>
  );
}

export default InfractionsByTypeReport;
