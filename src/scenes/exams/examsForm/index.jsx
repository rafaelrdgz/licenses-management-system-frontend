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
  isValidEntity,
  isValidIdDate,
  isValidPersonID,
} from "../../../utils/validations.js";
import { createExam, getExamById, updateExam } from "../../../apis/ExamsAPI.js";
import { getEntityById } from "../../../apis/EntityAPI.js";

function ExamsForm() {
  const [editing, setEditing] = useState(false);
  const [invalidType, setInvalidType] = useState(false); // Estado para manejar el error del tipo de examen
  const [info, setInfo] = useState({
    personId: "",
    id: "",
    date: "",
    entityCode: "",
    examinerName: "",
    type: "",
    result: "",
  });

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const params = useParams();

  const loadExam = async (id) => {
    const info = await getExamById(id);
    setInfo(info);
    setEditing(true);
  };

  useEffect(() => {
    if (params.id) {
      loadExam(params.id);
    }
  }, [params.id]);

  const checkoutSchema = yup.object().shape({
    personId: yup
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
    examinerName: yup
      .string()
      .required("El nombre es requerido")
      .matches(
        /^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$/,
        "El nombre no debe contener números ni caracteres especiales"
      )
      .min(5, "El nombre debe tener al menos 5 caracteres")
      .max(50, "El nombre debe tener menos de 50 caracteres"),
    entityCode: yup
      .string()
      .required("El código es requerido")
      .min(6, "El código debe tener al menos 6 caracteres")
      .max(36, "El código debe tener menos de 36 caracteres")
      .test(
        "is-valid-entity",
        "El código de la entidad no se encuentra en el sistema",
        isValidEntity
      ),
    type: yup.string().required("El tipo de examen es requerido"),
    result: yup.string().required("El resultado es requerido"),
  });

  const handleFormSubmit = async (values) => {
    const entity = await getEntityById(values.entityCode); // Obtener entidad por código
    if (entity.type === "AUTOESCUELA" && values.type === "MEDICO") {
      setInvalidType(true); // Mostrar error si el tipo de examen es inválido para la entidad
      return;
    }
    if (
      entity.type === "CLINICA" &&
      (values.type === "TEORICO" || values.type === "PRACTICO")
    ) {
      setInvalidType(true);
      return;
    }

    setInvalidType(false); // Ocultar el error cuando se corrige el tipo de examen

    let response;
    if (editing) {
      response = await updateExam(params.id, values);
    } else {
      response = await createExam(values);
    }
    navigate("/exams");
  };

  return (
    <Box m="20px">
      <Header
        title={"EXAMEN " + info.id}
        subtitle={editing ? "Editar datos de examen" : "Insertar nuevo examen"}
      />
      <Formik
        enableReinitialize
        validateOnMount
        initialValues={info}
        validationSchema={checkoutSchema}
        onSubmit={handleFormSubmit}
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
                error={touched.personId && !!errors.personId}
                helperText={touched.personId && errors.personId}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Código de la entidad que realizó el examen"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.entityCode}
                name="entityCode"
                error={touched.entityCode && !!errors.entityCode}
                helperText={touched.entityCode && errors.entityCode}
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
                error={touched.examinerName && !!errors.examinerName}
                helperText={touched.examinerName && errors.examinerName}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="exam-type-label">Tipo</InputLabel>
                <Select
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.type}
                  name="type"
                  error={touched.type && !!errors.type}
                  helpertext={touched.type && errors.type}
                >
                  <MenuItem value={"TEORICO"}>Teórico</MenuItem>
                  <MenuItem value={"PRACTICO"}>Práctico</MenuItem>
                  <MenuItem value={"MEDICO"}>Médico</MenuItem>
                </Select>
                {invalidType && (
                  <FormHelperText sx={{ color: "#f44336" }}>
                    Tipo de examen no válido para la entidad seleccionada.
                  </FormHelperText>
                )}
                {touched.type && errors.type && (
                  <FormHelperText sx={{ color: "#f44336" }}>
                    {errors.type}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="exam-result-label">Resultado</InputLabel>
                <Select
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.result}
                  name="result"
                  error={touched.result && !!errors.result}
                  helpertext={touched.result && errors.result}
                >
                  <MenuItem value={"APROBADO"}>Aprobado</MenuItem>
                  <MenuItem value={"REPROBADO"}>Reprobado</MenuItem>
                </Select>
                {touched.result && errors.result && (
                  <FormHelperText sx={{ color: "#f44336" }}>
                    {errors.result}
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
                type="submit"
                color="secondary"
                variant="contained"
                onClick={() => {
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

export default ExamsForm;
