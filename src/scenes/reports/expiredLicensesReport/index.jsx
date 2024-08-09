import React from "react";
import { Header, TableToolbar } from "../../../components";
import { Box, Button, useMediaQuery, useTheme, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";
import { tokens } from "../../../theme.js";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import dayjs from "dayjs";

function ExpiredLicensesReport() {
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
      headerName: "Código de licencia",
      flex: 1,
    },
    {
      field: "driverName",
      headerName: "Nombre del conductor",
      flex: 1,
    },
    {
        field: "driverId",
        headerName: "Número de identidad",
        flex: 1,
      },
    {
      field: "licenseType",
      headerName: "Tipo de licencia",
      flex: 1,
    },
    {
      field: "expirationDate",
      headerName: "Fecha de vencimiento",
      flex: 1,
    },
    {
      field: "licenseStatus",
      headerName: "Estado de licencia",
      flex: 1,
    },
  ];

  const handleFormSubmit = async (values) => {
    //se trae de la bd los datos de las licencias y se guardan con setInfo en rows, Presentar la información ordenada por fecha de emisión.
    console.log(values);
    setSearch(true);
    setInfo({
      ...info,
      startDate: values.startDate,
      endDate: values.endDate,
    })
      
  };

  const handleExportPdf = () => {
    const doc = new jsPDF();
  
    // Título del PDF
    doc.setFontSize(18);
    doc.text("Reporte de Conductores con Licencias Vencidas", 20, 20);
  
    // Fechas de inicio y fin
    doc.setFontSize(12);
    doc.text(`Fecha de inicio: ${info.startDate.format('DD/MM/YYYY').toString()}`, 20, 40);
    doc.text(`Fecha de fin: ${info.endDate.format('DD/MM/YYYY').toString()}`, 20, 50);
  
    // Formato de los datos para la tabla
    const licencias = info.rows.map((row) => [
      row.id,
      row.driverName,
      row.driverId,
      row.licenseType,
      dayjs(row.expirationDate).format('DD/MM/YYYY'),
      row.licenseStatus,
    ]);
  
    // Generación de la tabla con autoTable
    autoTable(doc, {
      head: [["Código de licencia", "Nombre del conductor", "Número de identidad", "Tipo de licencia", "Fecha de vencimiento", "Estado de licencia"]],
      body: licencias,
      startY: 60,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] },
    });
  
    // Guardar el PDF con un nombre específico
    doc.save("Reporte_Licencias_Vencidas.pdf");
  };
  
  

  return (
    <Box m={"20px"}>
      <Header
        title={"REPORTES"}
        subtitle={"Reporte de Conductores con Licencias Vencidas en un Período de Tiempo"}
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
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
              sx={{ mt: "10px", mb: "30px"}}
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
          Fecha de inicio: {info.startDate.format('DD/MM/YYYY').toString()}
        </Typography>
        <Typography
          variant="h4"
          sx={{ mt: "20px", mb: "10px" }}
          color={colors.gray[100]}
        >
          {" "}
          Fecha de fin: {info.endDate.format('DD/MM/YYYY').toString()}
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
              localeText={esES.components.MuiDataGrid.defaultProps.localeText}
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
                    fileName={"Licencias"}
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

export default ExpiredLicensesReport;
