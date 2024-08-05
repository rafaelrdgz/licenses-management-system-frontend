import React from "react";
import { Header, Select } from "../../../components";
import { Box, Button, useMediaQuery, MenuItem } from "@mui/material";
import { TextField } from "../../../components";
import { Formik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import { InputLabel } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {
  isValidIdDate,
  isValidPersonID,
} from "../../../utils/validations.js";
import { useTheme } from "@emotion/react";

function LicensesForm() {
  const theme = useTheme();
  const restrictionsList = [
    "Uso de lentes",
    "Conducción diurna",
    "Límite del radio de conducción",
    "Conducción sin pasajeros",
    "Limitación de velocidad",
    "Solo conducción en zonas urbanas",
  ];

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const [editing, setEditing] = useState(false);


  const [info, setInfo] = useState({
    id: "",
    driverId: "",
    type: "",
    issueDate: dayjs(),
    expirationDate: dayjs().add(10, "year"),
    category: "",
    restrictions: [],
  });

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const params = useParams();

  //Se carga el examen de la bd y se asigna el valor con setInfo
  const loadLicense = async (id) => {
    setEditing(true);
  };

  useEffect(() => {
    if (params.id) {
      loadLicense(params.id);
    }
  }, [params.id]);

  const initialValues = {
    id: info.id,
    driverId: info.driverId,
    type: info.type,
    issueDate: info.issueDate,
    expirationDate: info.expirationDate,
    category: info.category,
    restrictions: info.restrictions
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
    id: yup
      .string()
      .matches(
        /^[0-9]+$/,
        "El número de licencia no debe contener letras ni caracteres especiales"
      )
      .required("El número de licencia es requerido")
      .min(6, "El número de licencia debe tener al menos 6 caracteres")
      .max(16, "El número de licencia debe tener menos de 16 caracteres"),
    type: yup.string().required("El tipo de entidad es requerido"),
    category: yup.string().required("El tipo de entidad es requerido"),
    issueDate: yup.string().required("La fecha es requerida"),
    expirationDate: yup.string().required("La fecha es requerida"),
  });

  const handleFormSubmit = (values) => {
    const data = {
      ...values,
      restrictions: info.restrictions,
    };

    if (editing) {
      //caso en q se edita un examen existente hay q actualizar en la bd
    } else {
      //aki va el caso en q se debe insertar el nuevo examen en la bd
    }

    console.log(data);
    navigate("/licences");
  };

  const handleRestrictionsChange = (event) =>{
    const {
      target: { value },
    } = event;

    setInfo((prevInfo) => ({
      ...prevInfo,
      restrictions: typeof value === 'string' ? value.split(',') : value,
    }));

  }

  return (
    <Box m="20px">
      <Header
        title={"LICENCIAS"}
        subtitle={
          editing ? "Editar datos de licencia" : "Insertar nueva licencia"
        }
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
                label="Número de licencia"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.id}
                name="id"
                error={touched.id && errors.id}
                helperText={touched.id && errors.id}
                sx={{ gridColumn: "span 2" }}
              />
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
                  <MenuItem value={"A"}>A</MenuItem>
                  <MenuItem value={"B"}>B</MenuItem>
                  <MenuItem value={"C"}>C</MenuItem>
                  <MenuItem value={"D"}>D</MenuItem>
                  <MenuItem value={"E"}>E</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-filled-label">
                  Categoría
                </InputLabel>
                <Select
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.category}
                  name="category"
                  error={touched.category && errors.category}
                  helpertext={touched.category && errors.category}
                >
                  <MenuItem value={"Moto"}>Moto</MenuItem>
                  <MenuItem value={"Automóvil"}>Automóvil</MenuItem>
                  <MenuItem value={"Camión"}>Camión</MenuItem>
                  <MenuItem value={"Autobús"}>Autobús</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-filled-label">
                  Restricciones
                </InputLabel>
                <Select
                  multiple
                  value={info.restrictions}
                  onChange={handleRestrictionsChange}
                  name="restrictions"
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {restrictionsList.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={{
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? info.restrictions.indexOf(name) > -1
                              ? "green"
                              : "#2f2f2f"
                            : info.restrictions.indexOf(name) > -1
                            ? "green"
                            : "#ffffff",
                      }}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha de emisión"
                  sx={{ gridColumn: "span 2" }}
                  value={values.issueDate}
                  slotProps={{
                    textField: {
                      helperText: "MM/DD/YYYY",
                    },
                  }}
                />
                <DatePicker
                  label="Fecha de expiración"
                  sx={{ gridColumn: "span 2" }}
                  value={values.expirationDate}
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

export default LicensesForm;
