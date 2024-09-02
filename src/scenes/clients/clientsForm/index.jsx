import React, {useEffect, useState} from "react";
import {Header, TextField} from "../../../components";
import {Box, Button, useMediaQuery} from "@mui/material";
import {Formik} from "formik";
import * as yup from "yup";
import {useNavigate, useParams} from "react-router-dom";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {isValidIdDate} from "../../../utils/validations.js";
import {createClient, getClientById, updateClient,} from "../../../apis/ClientAPI.js";

function ClientsForm() {
  const [editing, setEditing] = useState(false);

  const [info, setInfo] = useState({
    id: "",
    name: "",
    lastNames: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const params = useParams();

  //Se carga el cliente de la bd y se asigna el valor con setInfo
  const loadClient = async (id) => {
    const info = await getClientById(id);
    console.log(info);
    setInfo(info);
    setEditing(true);
  };

  useEffect(() => {
    if (params.id) {
      loadClient(params.id);
    }
  }, [params.id]);

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
      ),
    name: yup
      .string()
      .required("El nombre es requerido")
      .matches(
        /^[a-zA-ZÁÉÍÓÚáéíóú ]+$/,
        "El nombre no debe contener números ni caracteres especiales"
      )
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(25, "El nombre debe tener menos de 25 caracteres"),
    lastNames: yup
      .string()
      .required("Los apellidos son requeridos")
      .matches(
        /^[a-zA-ZÁÉÍÓÚáéíóú ]+$/,
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
  });

  const handleFormSubmit = async (values) => {
    let response;
    if (editing) {
      console.log("Actualizando cliente:", values);
      response = await updateClient(params.id, values);
    } else {
      const data = {...values, bornDate: getDate(values.id)};
      console.log("Creando nueva entidad:", data);
      response = await createClient(data);
    }
    console.log(response);
    navigate("/clients");
  };

  const getDate = (id) => {
    if (id.length !== 11) {
      throw new Error("El string debe contener 11 dígitos");
    }

    const año = id.substring(0, 2);
    const mes = id.substring(2, 4);
    const dia = id.substring(4, 6);

    let añoCompleto;

    if (parseInt(año) >= 0 && parseInt(año) <= 5) {
      añoCompleto = `20${año}`;
    } else {
      añoCompleto = `19${año}`;
    }

    return `${añoCompleto}-${mes}-${dia}`;
  };

  return (
    <Box m="20px">
      <Header
        title={"CLIENTE " + info.id}
        subtitle={editing ? "Editar cliente" : "Insertar nuevo cliente"}
      />
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
                "& > div": {gridColumn: isNonMobile ? undefined : "span 4"},
              }}
            >
              {!editing && (
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="ID"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.id}
                  name="id"
                  error={touched.id && errors.id}
                  helperText={touched.id && errors.id}
                  sx={{gridColumn: "span 2"}}
                />
              )}
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
                sx={{gridColumn: "span 2"}}
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
                sx={{gridColumn: "span 2"}}
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
                sx={{gridColumn: "span 2"}}
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
                error={touched.phoneNumber && errors.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
                sx={{gridColumn: "span 2"}}
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
                error={touched.address && errors.address}
                helperText={touched.address && errors.address}
                sx={{gridColumn: "span 2"}}
              />
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
                  if (
                    Object.keys(errors).length === 0 ||
                    (editing &&
                      "id" in errors &&
                      Object.keys(errors).length === 1)
                  )
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

export default ClientsForm;
