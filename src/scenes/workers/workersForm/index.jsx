import React from "react";
import { Header, Select } from "../../../components";
import { Box, Button, FormControl, FormHelperText, InputLabel, useMediaQuery, MenuItem } from "@mui/material";
import { TextField } from "../../../components";
import { Formik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { isValidIdDate } from "../../../utils/validations.js";


function WorkersForm() {
  const [editing, setEditing] = useState(false);

  const [info, setInfo] = useState({
    personId: "",
    name: "",
    lastNames: "",
    password: "",
    email: "",
    role: ""
  });

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const params = useParams();

  //Se carga el cliente de la bd y se asigna el valor con setInfo
  const loadClient = async (id) => {
    setEditing(true);
  };

  useEffect(() => {
    if (params.id) {
      loadClient(params.id);
    }
  }, [params.id]);

  const initialValues = {
    personId: info.personId,
    name: info.name,
    password: info.password,
    email: info.email,
    lastNames: info.lastNames,
    role: info.role
  };

  const checkoutSchema = yup.object().shape({
    personId: yup
      .string()
      .matches(/^[0-9]+$/, "El número de indentificación no debe contener letras")
      .required("El número de indentificación es requerido")
      .min(11, "El número de indentificación debe tener 11 dígitos")
      .max(11, "El número de indentificación debe tener 11 dígitos")
      .test('is-valid-id', 'El número de indentificación no es válido', isValidIdDate),
    name: yup
      .string()
      .required("El nombre es requerido")
      .matches(/^[a-zA-ZÁÉÍÓÚáéíóú ]+$/, "El nombre no debe contener números ni caracteres especiales")
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(25, "El nombre debe tener menos de 25 caracteres"),
    lastNames: yup
      .string()
      .required("Los apellidos son requeridos")
      .matches(/^[a-zA-ZÁÉÍÓÚáéíóú ]+$/, "Los apellidos no deben contener números ni caracteres especiales")
      .min(5, "Los apellidos deben tener al menos 5 caracteres")
      .max(50, "Los apellidos deben tener menos de 50 caracteres"),
    email: yup
      .string()
      .email("El correo debe ser un correo válido")
      .required("El correo es requerido")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Correo no válido"),
    password: yup
      .string()
      .required("La contraseña es requerida")
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .max(20, "La contraseña debe tener menos de 20 caracteres"),
    role: yup
      .string()
      .required("El rol es requerido"),
  });

  const handleFormSubmit = async (values) => {
    if (editing) {
      //caso en q se edita una entidad existente hay q actualizar en la bd

      return;
    }

    //aki va el caso en q se debe insertar la nueva entidad en la bd
    console.log(values);
    navigate("/workers");
  };

  return (
    <Box m="20px">
      <Header title={"TRABAJADORES"} subtitle={editing ? 'Editar trabajador' : 'Insertar nuevo trabajador'}/>
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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nombre"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={touched.name && errors.name}
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
                error={touched.lastNames && errors.lastNames}
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
                error={touched.email && errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Contraseña"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={touched.password && errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-filled-label">
                  Rol
                </InputLabel>
                <Select
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.role}
                  name="role"
                  error={touched.role && errors.role}
                  helpertext={touched.role && errors.role}
                >
                  <MenuItem value={"MANAGER"}>Manager</MenuItem>
                  <MenuItem value={"Clínica"}>Clínica</MenuItem>
                </Select>
                {touched.role && errors.role && (
                  <FormHelperText sx={{color: '#f44336'}}>{errors.role}</FormHelperText> // Aquí se muestra el mensaje de error
                )}
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
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

export default WorkersForm;
