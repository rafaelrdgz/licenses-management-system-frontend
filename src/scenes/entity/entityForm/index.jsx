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

function EntityForm() {
  const [editing, setEditing] = useState(false);

  const [info, setInfo] = useState({
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

  //Se carga la entidad de la bd
  const loadEntity = async (id) => {
    await axios.get(``).then((res) => {
      setInfo(res.data);
      setEditing(true);
    });
  }

  useEffect(() => {
    if (params.id) {
      loadEntity(params.id);
    }
  }, [params.id]);  

  const initialValues = {
    name: info.name,
    address: info.address,
    phone: info.phone,
    directorName: info.directorName,
    email: info.email,
    type: info.type,
  };

  const checkoutSchema = yup.object().shape({
    name: yup
      .string()
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
      .matches(/^[0-9]+$/, "El número de teléfono debe ser un número")
      .required("El número de teléfono es requerido")
      .min(6, "El número de teléfono debe tener al menos 6 caracteres")
      .max(12, "El número de teléfono debe tener menos de 12 caracteres"),
    directorName: yup
      .string()
      .required("El nombre del director es requerido")
      .min(5, "El nombre del director debe tener al menos 5 caracteres")
      .max(50, "El nombre del director debe tener menos de 50 caracteres"),
    email: yup
      .string()
      .email("El correo debe ser un correo válido")
      .required("El correo es requerido"),
    type: yup.string().required("El tipo de entidad es requerido"),
  });

  const handleFormSubmit = async (values) => {
    if(editing){//caso en q se edita una entidad existente

      return
    }

    //aki va el caso en q se debe insertar la nueva entidad en la bd
    console.log(values)
    navigate('/')
  };

  return (
    <Box m="20px">
      <Header title={"ENTIDAD"} subtitle={""} />
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
              <FormControl
                variant="filled"
                sx={{ gridColumn: "span 2" }}
              >
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
                  <MenuItem value={"Autoescuela"}>Autoescuela</MenuItem>
                  <MenuItem value={"Clínica"}>Clínica</MenuItem>
                </Select>
              </FormControl>
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

export default EntityForm;
