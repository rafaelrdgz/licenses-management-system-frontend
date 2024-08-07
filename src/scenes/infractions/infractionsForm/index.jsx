import React from "react";
import { Header, Select } from "../../../components";
import { Box, Button, useMediaQuery } from "@mui/material";
import { TextField } from "../../../components";
import { Formik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { InputLabel } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {
  isValidIdDate,
  isValidEntity,
  isValidPersonID,
} from "../../../utils/validations.js";

function InfractionsForm() {
  const [editing, setEditing] = useState(false);

  const [info, setInfo] = useState({
    driverId: "",
    code: "",
    date: dayjs(),
    site: "",
    description: "",
    points: 1,
    type: "",
    paid: false,
  });

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const params = useParams();

  //Se carga el examen de la bd y se asigna el valor con setInfo
  const loadInfraction = async (id) => {
    setEditing(true);
  };

  useEffect(() => {
    if (params.id) {
      loadInfraction(params.id);
    }
  }, [params.id]);

  const initialValues = {
    driverId: info.driverId,
    code: info.code,
    date: info.date,
    site: info.site,
    description: info.description,
    points: info.points,
    type: info.type,
    paid: info.paid,
  };

  const checkoutSchema = yup.object().shape({
    driverId: yup
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
    code: yup
      .string()
      .matches(/^[0-9]+$/, "El código debe ser un número")
      .required("El código es requerido")
      .min(6, "El código debe tener al menos 6 caracteres")
      .max(16, "El código debe tener menos de 16 caracteres"),
    description: yup
      .string()
      .required("La descripción es requerida")
      .min(5, "La descripción debe tener al menos 5 caracteres")
      .max(50, "La descripción debe tener menos de 50 caracteres"),
    type: yup
      .string()
      .required("El tipo de infracción es requerido"),
    site: yup
      .string()
      .required("El lugar es requerido")
      .min(5, "La descripción debe tener al menos 5 caracteres")
      .max(25, "La descripción debe tener menos de 25 caracteres"),
    date: yup
      .string()
      .required("La fecha es requerida"),
    points: yup
      .number()
      .required("Los puntos son requeridos")
      .min(1, "Los puntos deben ser al menos 1")
      .max(36, "Los puntos deben ser menos de 36"),
    paid: yup
      .boolean()
      .required("El pago es requerido"),
  });

  const handleFormSubmit = async (values) => {
    if (editing) {
      //caso en q se edita un examen existente hay q actualizar en la bd
    } else {
      //aki va el caso en q se debe insertar el nuevo examen en la bd
    }

    console.log(values);
    navigate("/infractions");
  };

  return (
    <Box m="20px">
      <Header
        title={"INFRACCIONES"}
        subtitle={editing ? "Editar datos de infracción" : "Insertar nueva infracción"}
      />
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
                label="Número de identificación del conductor"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.driverId}
                name="driverId"
                error={touched.driverId && errors.driverId}
                helperText={touched.driverId && errors.driverId}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Código de infracción"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.code}
                name="code"
                error={touched.code && errors.code}
                helperText={touched.code && errors.code}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Lugar"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.site}
                name="site"
                error={touched.site && errors.site}
                helperText={touched.site && errors.site}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-filled-label">
                  Tipo
                </InputLabel>
                <Select
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.type}
                  name="type"
                  error={touched.type && errors.type}
                  helpertext={touched.type && errors.type}
                >
                  <MenuItem value={"Leve"}>Leve</MenuItem>
                  <MenuItem value={"Grave"}>Grave</MenuItem>
                  <MenuItem value={"Muy grave"}>Muy grave</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-filled-label">
                  Estado del pago
                </InputLabel>
                <Select
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.paid}
                  name="paid"
                  error={touched.paid && errors.paid}
                  helpertext={touched.paid && errors.paid}
                >
                  <MenuItem value={true}>Pagado</MenuItem>
                  <MenuItem value={false}>Pendiente</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Descripción"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={touched.description && errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Puntos deducidos"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.points}
                name="points"
                error={touched.points && errors.points}
                helperText={touched.points && errors.points}
                sx={{ gridColumn: "span 2" }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  maxDate={dayjs()}
                  label="Fecha"
                  sx={{ gridColumn: "span 2" }}
                  value={values.date}
                  slotProps={{
                    textField: {
                      helperText: "MM/DD/YYYY",
                    },
                  }}
                />
              </LocalizationProvider>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="end"
              mt="20px"
            >
              <Button type="submit" color="secondary" variant="contained">
                Guardar
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}

export default InfractionsForm;
