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
  fetchInfractionsByDateRangePdf,
  getInfractionsByDateRange,
} from "../../../apis/ReportsAPI.js";
import { useTranslation } from "react-i18next";
import "dayjs/locale/es-us.js";
import { LoadingButton } from "@mui/lab";

function RegisteredInfractionsReport () {
  const { t } = useTranslation();
  const currentLanguage = t.language; // Obtener el idioma actual

  const localeText =
    currentLanguage === "es"
      ? esES.components.MuiDataGrid.defaultProps.localeText
      : enUS.components.MuiDataGrid.defaultProps.localeText;

  const adapterLocale = currentLanguage === "es" ? "es-us" : "en";

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);

  const [info, setInfo] = useState({
    startDate: null,
    endDate: dayjs(),
    rows: [],
  });

  const initialValues = {
    startDate: info.startDate,
    endDate: info.endDate,
  };

  const checkoutSchema = yup.object().shape({
    startDate: yup
      .date()
      .required("La fecha de inicio es requerida")
      .typeError("Fecha de inicio inválida"),
    endDate: yup
      .date()
      .required("La fecha de fin es requerida")
      .typeError("Fecha de fin inválida")
      .min(
        yup.ref("startDate"),
        "La fecha de fin debe ser mayor que la fecha de inicio"
      ),
  });

  const columns = [
    {
      field: "id",
      headerName: "Código de infracción",
      flex: 1,
    },
    {
      field: "licenseId",
      headerName: "Número de licencia",
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
      field: "address",
      headerName: "Lugar",
      flex: 1,
    },
    {
      field: "pointsDeducted",
      headerName: "Puntos deducidos",
      flex: 1,
    },
    {
      field: "paid",
      headerName: "Estado de pago",
      flex: 1,
    },
  ];

  const handleFormSubmit = async (values) => {
    const response = await getInfractionsByDateRange(
      values.startDate,
      values.endDate
    );
    console.log(response);
    response.forEach((infraction) => {
      infraction.date = dayjs(infraction.date).format("DD/MM/YYYY");
      infraction.paid = infraction.paid ? "Pagado" : "Pendiente";
    });
    setSearch(true);
    setInfo({
      rows: response,
      startDate: values.startDate,
      endDate: values.endDate,
    });
  };

  const handleExportPdf = async () => {
    setLoading(true);
    await fetchInfractionsByDateRangePdf(info);
    setLoading(false);
  };

  return (
    <Box m={ "20px" }>
      <Header
        title={ t("reports.title") }
        subtitle={ t("reports.registeredInfractions") }
      />
      { search && (
        <LoadingButton
          loading={ loading }
          sx={ { mb: "10px" } }
          color="secondary"
          variant="contained"
          onClick={ handleExportPdf }
        >
          { t("reports.export") }
        </LoadingButton>
      ) }
      <Formik
        onSubmit={ handleFormSubmit }
        initialValues={ initialValues }
        validationSchema={ checkoutSchema }
      >
        { ({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={ handleSubmit }>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={ {
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              } }
            >
              <LocalizationProvider
                dateAdapter={ AdapterDayjs }
                adapterLocale={ adapterLocale }
              >
                <DatePicker
                  minDate={ dayjs("2000-01-01") }
                  maxDate={ dayjs().subtract(1, "day") }
                  format="DD/MM/YYYY"
                  label={ t("reports.startDate") }
                  sx={ { gridColumn: "span 2" } }
                  value={ values.startDate }
                  onChange={ (newValue) =>
                    handleChange({
                      target: { name: "startDate", value: newValue },
                    })
                  }
                  slotProps={ {
                    textField: {
                      error: Boolean(touched.startDate && errors.startDate),
                      helperText: touched.startDate && errors.startDate,
                    },
                  } }
                />
                <DatePicker
                  format="DD/MM/YYYY"
                  maxDate={ dayjs() }
                  label={ t("reports.endDate") }
                  sx={ { gridColumn: "span 2" } }
                  value={ values.endDate }
                  onChange={ (newValue) =>
                    handleChange({
                      target: { name: "endDate", value: newValue },
                    })
                  }
                  slotProps={ {
                    textField: {
                      error: Boolean(touched.endDate && errors.endDate),
                      helperText: touched.endDate && errors.endDate,
                    },
                  } }
                />
              </LocalizationProvider>
            </Box>
            <Button
              sx={ { mt: "10px", mb: "30px" } }
              type="submit"
              color="secondary"
              variant="contained"
            >
              { t("reports.find") }
            </Button>
          </form>
        ) }
      </Formik>

      { search && (
        <div>
          <Typography
            variant="h4"
            sx={ { mt: "20px", mb: "10px" } }
            color={ colors.gray[100] }
          >
            { t("reports.startDate") }: { info.startDate.format("DD/MM/YYYY").toString() }
          </Typography>
          <Typography
            variant="h4"
            sx={ { mt: "20px", mb: "10px" } }
            color={ colors.gray[100] }
          >
            { t("reports.endDate") }: { info.endDate.format("DD/MM/YYYY").toString() }
          </Typography>
          <Box
            sx={ {
              height: "80vh",
              maxflex: "100%",
              "& .actions": {
                color: "text.secondary",
              },
              "& .textPrimary": {
                color: "text.primary",
              },
            } }
          >
            <DataGrid
              localeText={ localeText }
              initialState={ {
                pagination: {
                  paginationModel: { pageSize: 25, page: 0 },
                },
              } }
              rows={ info.rows }
              columns={ columns }
              components={ {
                Toolbar: () => (
                  <TableToolbar
                    columns={ columns }
                    rows={ info.rows }
                    fileName={ "Infractions" }
                  />
                ),
              } }
            />
          </Box>
        </div>
      ) }
    </Box>

  );
}

export default RegisteredInfractionsReport;