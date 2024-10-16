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
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import dayjs from "dayjs";
import { getExamsByDateRange } from "../../../apis/ReportsAPI.js";
import { useTranslation } from "react-i18next";
import "dayjs/locale/es-us.js";

function ExamsPerformedReport() {
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

  const [search, setSearch] = useState(false);

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
      headerName: "Código del exámen",
      flex: 1,
    },
    {
      field: "personId",
      headerName: "ID del cliente",
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
      field: "result",
      headerName: "Resultado",
      flex: 1,
    },
    {
      field: "entityCode",
      headerName: "Entidad",
      flex: 1,
    },
  ];

  const handleFormSubmit = async (values) => {
    const response = await getExamsByDateRange(
      values.startDate,
      values.endDate
    );
    console.log(response);
    setSearch(true);
    response.forEach((exam) => {
      exam.date = dayjs(exam.date).format("DD/MM/YYYY");
    });
    setInfo({
      rows: response,
      startDate: values.startDate,
      endDate: values.endDate,
    });
  };

  const handleExportPdf = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Reporte de Exámenes Realizados en un Período de Tiempo", 20, 20);

    doc.setFontSize(12);
    doc.text(
      `Fecha de inicio: ${info.startDate.format("DD/MM/YYYY").toString()}`,
      20,
      40
    );
    doc.text(
      `Fecha de fin: ${info.endDate.format("DD/MM/YYYY").toString()}`,
      20,
      50
    );

    // Convertir las filas del DataGrid en un formato adecuado para autoTable
    const examenes = info.rows.map((row) => [
      row.id,
      row.personId,
      row.type,
      row.date,
      row.result,
      row.entityCode,
    ]);

    autoTable(doc, {
      head: [
        [
          "Código del exámen",
          "Id del cliente",
          "Tipo",
          "Fecha",
          "Resultado",
          "Entidad",
        ],
      ],
      body: examenes,
      startY: 60,
      theme: "striped",
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save("Reporte_Examenes_Realizados.pdf");
  };

  return (
    <Box m={"20px"}>
      <Header
        title={"REPORTES"}
        subtitle={"Reporte de Exámenes Realizados en un Período de Tiempo"}
      />
      {search && (
        <Button
          sx={{ mb: "10px" }}
          color="secondary"
          variant="contained"
          onClick={handleExportPdf}
        >
          Exportar PDF
        </Button>
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
                  minDate={dayjs("2000-01-01")}
                  maxDate={dayjs().subtract(1, "day")}
                  format="DD/MM/YYYY"
                  label="Fecha de inicio"
                  sx={{ gridColumn: "span 2" }}
                  value={values.startDate}
                  onChange={(newValue) =>
                    handleChange({
                      target: { name: "startDate", value: newValue },
                    })
                  }
                  slotProps={{
                    textField: {
                      error: Boolean(touched.startDate && errors.startDate),
                      helperText: touched.startDate && errors.startDate,
                    },
                  }}
                />
                <DatePicker
                  format="DD/MM/YYYY"
                  maxDate={dayjs()}
                  label="Fecha de fin"
                  sx={{ gridColumn: "span 2" }}
                  value={values.endDate}
                  onChange={(newValue) =>
                    handleChange({
                      target: { name: "endDate", value: newValue },
                    })
                  }
                  slotProps={{
                    textField: {
                      error: Boolean(touched.endDate && errors.endDate),
                      helperText: touched.endDate && errors.endDate,
                    },
                  }}
                />
              </LocalizationProvider>
            </Box>
            <Button
              sx={{ mt: "10px", mb: "30px" }}
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
            Fecha de inicio: {info.startDate.format("DD/MM/YYYY").toString()}
          </Typography>
          <Typography
            variant="h4"
            sx={{ mt: "20px", mb: "10px" }}
            color={colors.gray[100]}
          >
            {" "}
            Fecha de fin: {info.endDate.format("DD/MM/YYYY").toString()}
          </Typography>
          <Box
            sx={{
              height: "80vh",
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
              rows={info.rows}
              columns={columns}
              components={{
                Toolbar: () => (
                  <TableToolbar
                    columns={columns}
                    rows={info.rows}
                    fileName={"Exámenes"}
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

export default ExamsPerformedReport;
