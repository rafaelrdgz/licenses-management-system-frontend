import React, { useEffect, useState } from "react";
import { Header, Select, TextField } from "../../../components";
import {
  Box,
  Button,
  FormHelperText,
  InputLabel,
  useMediaQuery,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useNavigate, useParams } from "react-router-dom";
import {
  createEntity,
  getEntityById,
  updateEntity,
} from "../../../apis/EntityAPI.js";

function EntityForm() {
  const [editing, setEditing] = useState(false);

  const [info, setInfo] = useState({
    code: "",
    name: "",
    address: "",
    phone: "",
    directorName: "",
    email: "",
    type: "",
  });

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const params = useParams();

  //Se carga la entidad de la bd y se asigna el valor con setInfo
  const loadEntity = async (id) => {
    const info = await getEntityById(id);
    console.log(info);
    setInfo(info);
    setEditing(true);
  };

  useEffect(() => {
    if (params.id) {
      loadEntity(params.id);
    }
  }, [params.id]);

  const checkoutSchema = yup.object().shape({
    // code: yup
    //   .string()
    //   .matches(/^[0-9]+$/, "El código debe ser un número")
    //   .required("El código es requerido")
    //   .min(6, "El código debe tener al menos 6 caracteres")
    //   .max(16, "El código debe tener menos de 16 caracteres"),
    name: yup
      .string()
      .matches(
        /^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$/,
        "El nombre no debe contener números ni caracteres especiales"
      )
      .required("El nombre es requerido")
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(50, "El nombre debe tener menos de 50 caracteres"),
    address: yup
      .string()
      .required("La dirección es requerida")
      .min(10, "La dirección debe tener al menos 10 caracteres")
      .max(100, "La dirección debe tener menos de 100 caracteres"),
    phone: yup
      .string()
      .matches(
        /^[0-9]+$/,
        "El número de teléfono no debe contener letras ni caracteres especiales"
      )
      .required("El número de teléfono es requerido")
      .min(8, "El número de teléfono debe tener 8 dígitos")
      .max(8, "El número de teléfono debe tener 8 dígitos"),
    directorName: yup
      .string()
      .matches(
        /^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$/,
        "El nombre del director no debe contener números ni caracteres especiales"
      )
      .required("El nombre del director es requerido")
      .min(5, "El nombre del director debe tener al menos 5 caracteres")
      .max(50, "El nombre del director debe tener menos de 50 caracteres"),
    email: yup
      .string()
      .email("El correo debe ser un correo válido")
      .required("El correo es requerido")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Correo no válido"),
    type: yup.string().required("El tipo de entidad es requerido"),
  });

  const handleFormSubmit = async (values) => {
    if (editing) {
      console.log("Actualizando entidad:", values);
      await updateEntity(params.id, values);
    } else {
      console.log("Creando nueva entidad:", values);
      await createEntity(values);
    }
    navigate("/entity");
  };

  return (
    <Box m="20px">
      <Header
        title={"ENTIDAD " + info.code}
        subtitle={editing ? "Editar entidad" : "Crear nueva entidad"}
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
                error={touched.name && errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Número de teléfono"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                error={touched.phone && errors.phone}
                helperText={touched.phone && errors.phone}
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
                type="text"
                label="Nombre del director"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.directorName}
                name="directorName"
                error={touched.directorName && errors.directorName}
                helperText={touched.directorName && errors.directorName}
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
                error={touched.address && errors.address}
                helperText={touched.address && errors.address}
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
                  <MenuItem value={"AUTOESCUELA"}>Autoescuela</MenuItem>
                  <MenuItem value={"CLINICA"}>Clínica</MenuItem>
                </Select>
                {touched.type && errors.type && (
                  <FormHelperText sx={{ color: "#f44336" }}>
                    {errors.type}
                  </FormHelperText>
                )}
              </FormControl>
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

export default EntityForm;
