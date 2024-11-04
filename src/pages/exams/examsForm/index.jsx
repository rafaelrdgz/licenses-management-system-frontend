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

import { useTranslation } from "react-i18next";

function ExamsForm () {
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

  const { t } = useTranslation();

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
        t("form.client.id.matches")
      )
      .required(t("form.client.id.required"))
      .min(11, t("form.client.id.min"))
      .max(11, t("form.client.id.max"))
      .test(
        "is-valid-id",
        t("form.client.id.isValidIdDate"),
        isValidIdDate
      )
      .test(
        "is-valid-person",
        t("form.client.id.isValidPersonID"),
        isValidPersonID
      ),
    examinerName: yup
      .string()
      .required(t("form.exam.examinerName.required"))
      .matches(
        /^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$/,
        t("form.exam.examinerName.matches")
      )
      .min(5, t("form.exam.examinerName.min"))
      .max(50, t("form.exam.examinerName.max")),
    entityCode: yup
      .string()
      .required(t("form.exam.entityCode.required"))
      .min(6, t("form.exam.entityCode.min"))
      .max(36, t("form.exam.entityCode.max"))
      .test(
        "is-valid-entity",
        t("form.exam.entityCode.isValidEntity"),
        isValidEntity
      ),
    type: yup.string().required(t("form.exam.type.required")),
    result: yup.string().required(t("form.exam.result.required")),
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
        title={ t("exams.title") + " " + info.id }
        subtitle={ editing ? t("exams.editExam") : t("exams.createExam") }
      />
      <Formik
        enableReinitialize
        validateOnMount
        initialValues={ info }
        validationSchema={ checkoutSchema }
        onSubmit={ handleFormSubmit }
      >
        { ({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={ handleSubmit }>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={ {
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              } }
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={ t("types.clientID") }
                onBlur={ handleBlur }
                onChange={ handleChange }
                value={ values.personId }
                name="personId"
                error={ touched.personId && !!errors.personId }
                helperText={ touched.personId && errors.personId }
                sx={ { gridColumn: "span 2" } }
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={ t("types.entityCode") }
                onBlur={ handleBlur }
                onChange={ handleChange }
                value={ values.entityCode }
                name="entityCode"
                error={ touched.entityCode && !!errors.entityCode }
                helperText={ touched.entityCode && errors.entityCode }
                sx={ { gridColumn: "span 2" } }
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={ t("types.examinerName") }
                onBlur={ handleBlur }
                onChange={ handleChange }
                value={ values.examinerName }
                name="examinerName"
                error={ touched.examinerName && !!errors.examinerName }
                helperText={ touched.examinerName && errors.examinerName }
                sx={ { gridColumn: "span 2" } }
              />
              <FormControl variant="filled" sx={ { gridColumn: "span 2" } }>
                <InputLabel id="exam-type-label">{ t("types.type") }</InputLabel>
                <Select
                  onBlur={ handleBlur }
                  onChange={ handleChange }
                  value={ values.type }
                  name="type"
                  error={ touched.type && !!errors.type }
                  helpertext={ touched.type && errors.type }
                >
                  <MenuItem value={ "TEORICO" }>{ t("types.examTypes.teoric") }</MenuItem>
                  <MenuItem value={ "PRACTICO" }>{ t("types.examTypes.practical") }</MenuItem>
                  <MenuItem value={ "MEDICO" }>{ t("types.examTypes.medical") }</MenuItem>
                </Select>
                { invalidType && (
                  <FormHelperText sx={ { color: "#f44336" } }>
                    { t("form.exam.invalidType") }
                  </FormHelperText>
                ) }
                { touched.type && errors.type && (
                  <FormHelperText sx={ { color: "#f44336" } }>
                    { errors.type }
                  </FormHelperText>
                ) }
              </FormControl>
              <FormControl variant="filled" sx={ { gridColumn: "span 2" } }>
                <InputLabel id="exam-result-label">{ t("types.result") }</InputLabel>
                <Select
                  onBlur={ handleBlur }
                  onChange={ handleChange }
                  value={ values.result }
                  name="result"
                  error={ touched.result && !!errors.result }
                  helpertext={ touched.result && errors.result }
                >
                  <MenuItem value={ "APROBADO" }>{ t("types.examResult.approved") }</MenuItem>
                  <MenuItem value={ "REPROBADO" }>{ t("types.examResult.failed") }</MenuItem>
                </Select>
                { touched.result && errors.result && (
                  <FormHelperText sx={ { color: "#f44336" } }>
                    { errors.result }
                  </FormHelperText>
                ) }
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
                onClick={ () => {
                  if (
                    Object.keys(errors).length === 0 ||
                    (editing &&
                      "id" in errors &&
                      Object.keys(errors).length === 1)
                  )
                    handleFormSubmit(values);
                } }
              >
                { t("form.save") }
              </Button>
            </Box>
          </form>
        ) }
      </Formik>
    </Box>
  );
}

export default ExamsForm;
