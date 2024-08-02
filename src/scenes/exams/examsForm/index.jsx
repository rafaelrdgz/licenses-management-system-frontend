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


function ExamsForm() {
  const [editing, setEditing] = useState(false);

  const [info, setInfo] = useState({
    personId: "",
    code: "",
    date: dayjs().subtract(1, "day"),
    entityName: "",
    examinerName: "",
    type: "",
    result: "",
  });

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const params = useParams();

  //Se carga el examen de la bd y se asigna el valor con setInfo
  const loadExam = async (id) => {
    setEditing(true);
  };

  useEffect(() => {
    if (params.id) {
      loadExam(params.id);
    }
  }, [params.id]);

  const initialValues = {
    personId: info.personId,
    code: info.code,
    date: info.date,
    entityName: info.entityName,
    examinerName: info.examinerName,
    type: info.type,
    result: info.result,
  };

  const checkoutSchema = yup.object().shape({
    personId: yup
      .string()
      .matches(/^[0-9]+$/, "El número de indentificación no debe contener letras")
      .required("El número de indentificación es requerido")
      .min(11, "El número de indentificación debe tener 11 dígitos")
      .max(11, "El número de indentificación debe tener 11 dígitos")
      .test('is-valid-id', 'El número de indentificación no es válido', isValidIdDate),
    code: yup
      .string()
      .matches(/^[0-9]+$/, "El código debe ser un número")
      .required("El código es requerido")
      .min(6, "El código debe tener al menos 6 caracteres")
      .max(16, "El código debe tener menos de 16 caracteres"),
    examinerName: yup
      .string()
      .required("El nombre es requerido")
      .min(5, "El nombre debe tener al menos 5 caracteres")
      .max(50, "El nombre debe tener menos de 50 caracteres"),
    entityName: yup
      .string()
      .required("El nombre es requerido")
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(50, "El nombre debe tener menos de 50 caracteres"),
    type: yup
      .string()
      .required("El tipo de entidad es requerido"),
    result: yup
      .string()
      .required("El tipo de entidad es requerido"),
    date: yup
      .string()
      .required("La fecha es requerida")
  });

  const handleFormSubmit = async (values) => {
    if (editing) {
      //caso en q se edita un examen existente hay q actualizar en la bd

    }else{
      //aki va el caso en q se debe insertar el nuevo examen en la bd

    }

    console.log(values);
    navigate("/exams");
  };

  function isValidIdDate(id) {
    let y = id.substring(0,2); 
    let m = id.substring(2,4); 
    let d = id.substring(4,6);

    if(dayjs(`${y}-${m}-${d}`, 'YY-MM-DD', true).isValid()){
      return true;
    }
    return false;
  }


  return (
    <Box m="20px">
      <Header
        title={"Examen"}
        subtitle={editing ? "Editar datos de exámen" : "Insertar nuevo exámen"}
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
                label="Número de identificación del cliente examinado"
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
                label="Código del exámen"
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
                label="Nombre de la entidad que realizó el exámen"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.entityName}
                name="entityName"
                error={touched.entityName && errors.entityName}
                helperText={touched.entityName && errors.entityName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nombre del examinador/Médico encargado"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.examinerName}
                name="examinerName"
                error={touched.examinerName && errors.examinerName}
                helperText={touched.examinerName && errors.examinerName}
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
                  <MenuItem value={"Teórico"}>Teórico</MenuItem>
                  <MenuItem value={"Práctico"}>Práctico</MenuItem>
                  <MenuItem value={"Médico"}>Médico</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-filled-label">
                  Resultado
                </InputLabel>
                <Select
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.result}
                  name="result"
                  error={touched.result && errors.result}
                  helpertext={touched.result && errors.result}
                >
                  <MenuItem value={"Aprobado"}>Aprobado</MenuItem>
                  <MenuItem value={"Reprobado"}>Reprobado</MenuItem>
                </Select>
              </FormControl>
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

export default ExamsForm;
