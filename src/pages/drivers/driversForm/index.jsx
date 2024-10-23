import React, { useEffect, useState } from "react";
import { Header, Select, TextField } from "../../../components";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { getDriverById, updateDriver } from "../../../apis/DriversAPI.js";

function DriversForm() {
  const [info, setInfo] = useState({
    id: "",
    name: "",
    lastNames: "",
    address: "",
    phoneNumber: "",
    email: "",
    licenseStatus: "",
  });

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const params = useParams();

  //Se carga el conductor de la bd y se asigna el valor con setInfo
  const loadDriver = async (id) => {
    const info = await getDriverById(id);
    console.log(info);
    setInfo(info);
  };

  useEffect(() => {
    if (params.id) {
      loadDriver(params.id);
    }
  }, [params.id]);

  const checkoutSchema = yup.object().shape({
    name: yup
      .string()
      .required("El nombre es requerido")
      .matches(
        /^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$/,
        "El nombre no debe contener números ni caracteres especiales"
      )
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(25, "El nombre debe tener menos de 25 caracteres"),
    lastNames: yup
      .string()
      .required("Los apellidos son requeridos")
      .matches(
        /^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$/,
        "Los apellidos no deben contener números ni caracteres especiales"
      )
      .min(5, "Los apellidos deben tener al menos 5 caracteres")
      .max(50, "Los apellidos deben tener menos de 50 caracteres"),
    address: yup
      .string()
      .required("La dirección es requerida")
      .min(10, "La dirección debe tener al menos 10 caracteres")
      .max(100, "La dirección debe tener menos de 100 caracteres"),
    phoneNumber: yup
      .string()
      .required("El número de teléfono es requerido")
      .matches(
        /^[0-9]+$/,
        "El número de teléfono no debe contener letras ni caracteres especiales"
      )
      .min(6, "El número de teléfono debe tener al menos 6 dígitos")
      .max(12, "El número de teléfono debe tener menos de 12 dígitos"),
    email: yup
      .string()
      .email("El correo debe ser un correo válido")
      .required("El correo es requerido")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Correo no válido"),
    licenseStatus: yup
      .string()
      .required("El estado de la licencia es requerido"),
  });

  const handleFormSubmit = async (values) => {
    console.log("Actualizando conductor:", values);
    const response = await updateDriver(params.id, values);
    console.log(response);
    navigate("/drivers");
  };

  return (
    <Box m="20px">
      <Header title={"Conductor " + info.id} subtitle={"Editar conductor"} />
      <Formik
        enableReinitialize
        validateOnMount
        initialValues={info}
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
                label="Nombre"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Apellidos"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastNames}
                name="lastNames"
                error={touched.lastNames && !!errors.lastNames}
                helperText={touched.lastNames && errors.lastNames}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Correo"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Número de teléfono"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phoneNumber}
                name="phoneNumber"
                error={touched.phoneNumber && !!errors.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Dirección"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-filled-label">
                  Estado de licencia
                </InputLabel>
                <Select
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.licenseStatus}
                  name="licenseStatus"
                  error={touched.licenseStatus && !!errors.licenseStatus}
                  helpertext={touched.licenseStatus && errors.licenseStatus}
                >
                  <MenuItem value={"VIGENTE"}>Vigente</MenuItem>
                  <MenuItem value={"VENCIDA"}>Vencida</MenuItem>
                  <MenuItem value={"SUSPENDIDA"}>Suspendida</MenuItem>
                  <MenuItem value={"REVOCADA"}>Revocada</MenuItem>
                </Select>
              </FormControl>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
              ></LocalizationProvider>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="end"
              mt="20px"
            >
              <Button
                type="text"
                color="secondary"
                variant="contained"
                onClick={() => {
                  console.log(errors);
                  if (Object.keys(errors).length === 0)
                    handleFormSubmit(values);
                }}
              >
                Guardar
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}

export default DriversForm;
