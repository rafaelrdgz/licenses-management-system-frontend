import React from "react";
import { Header, Select } from "../../../components";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  useMediaQuery,
  MenuItem,
} from "@mui/material";
import { TextField } from "../../../components";
import { Formik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { existWorkerID, isValidIdDate } from "../../../utils/validations.js";
import {
  createWorker,
  getWorkerById,
  updateWorker,
} from "../../../apis/WorkerAPI.js";
import { useTranslation } from "react-i18next";

function WorkersForm () {
  const [editing, setEditing] = useState(false);

  const [info, setInfo] = useState({
    id: "",
    name: "",
    lastNames: "",
    password: "",
    email: "",
    role: "",
  });

  const { t } = useTranslation();

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const params = useParams();

  //Se carga el cliente de la bd y se asigna el valor con setInfo
  const loadClient = async (id) => {
    const info = await getWorkerById(id);
    console.log(info);
    setInfo(info);
    setEditing(true);
  };

  useEffect(() => {
    if (params.id) {
      loadClient(params.id);
    }
  }, [params.id]);

  const initialValues = {
    id: info.id,
    name: info.name,
    password: info.password,
    email: info.email,
    lastNames: info.lastNames,
    role: info.role,
  };

  const checkoutSchema = yup.object().shape({
    id: yup
      .string()
      .matches(
        /^[0-9]+$/,
        t("form.worker.id.matches")
      )
      .required(t("form.worker.id.required"))
      .min(11, t("form.worker.id.min"))
      .max(11, t("form.worker.id.max"))
      .test(
        "is-valid-id",
        t("form.worker.id.test.is-valid-id"),
        isValidIdDate
      )
      .test(
        "is-valid-person",
        t("form.worker.id.test.existWorkerID"),
        existWorkerID
      ),
    name: yup
      .string()
      .required(t("form.worker.name.required"))
      .matches(
        /^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$/,
        t("form.worker.name.matches")
      )
      .min(3, t("form.worker.name.min"))
      .max(25, t("form.worker.name.max")),
    lastNames: yup
      .string()
      .required(t("form.worker.lastNames.required"))
      .matches(
        /^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$/,
        t("form.worker.lastNames.matches")
      )
      .min(5, t("form.worker.lastNames.min"))
      .max(50, t("form.worker.lastNames.max")),
    email: yup
      .string()
      .email(t("form.worker.email.email"))
      .required(t("form.worker.email.required"))
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, t("form.worker.email.matches")),
    password: yup
      .string()
      .required(t("form.worker.password.required"))
      .min(8, t("form.worker.password.min"))
      .max(20, t("form.worker.password.max")),
    role: yup.string().required(t("form.worker.role.required")),
  });

  const handleFormSubmit = async (values) => {
    let response;
    if (editing) {
      console.log("Actualizando trabajador:", values);
      response = await updateWorker(params.id, values);
    } else {
      const data = { ...values };
      console.log("Creando nueva entidad:", data);
      response = await createWorker(data);
    }
    console.log(response);
    navigate("/workers");
  };

  return (
    <Box m="20px">
      <Header
        title={ t("workers.title") + " " + info.id }
        subtitle={ editing ? t("workers.editWorker") : t("workers.createWorker") }
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
              { !editing && (
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label={ t("types.workerID") }
                  onBlur={ handleBlur }
                  onChange={ handleChange }
                  value={ values.id }
                  name="id"
                  error={ touched.id && !!errors.id }
                  helperText={ touched.id && errors.id }
                  sx={ { gridColumn: "span 2" } }
                />
              ) }
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={ t("types.name") }
                onBlur={ handleBlur }
                onChange={ handleChange }
                value={ values.name }
                name="name"
                error={ touched.name && !!errors.name }
                helperText={ touched.name && errors.name }
                sx={ { gridColumn: "span 2" } }
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={ t("types.lastNames") }
                onBlur={ handleBlur }
                onChange={ handleChange }
                value={ values.lastNames }
                name="lastNames"
                error={ touched.lastNames && !!errors.lastNames }
                helperText={ touched.lastNames && errors.lastNames }
                sx={ { gridColumn: "span 2" } }
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={ t("types.email") }
                onBlur={ handleBlur }
                onChange={ handleChange }
                value={ values.email }
                name="email"
                error={ touched.email && !!errors.email }
                helperText={ touched.email && errors.email }
                sx={ { gridColumn: "span 2" } }
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label={ t("types.password") }
                onBlur={ handleBlur }
                onChange={ handleChange }
                value={ values.password }
                name="password"
                error={ touched.password && !!errors.password }
                helperText={ touched.password && errors.password }
                sx={ { gridColumn: "span 2" } }
              />
              <FormControl variant="filled" sx={ { gridColumn: "span 2" } }>
                <InputLabel id="demo-simple-select-filled-label">
                  { t("types.role") }
                </InputLabel>
                <Select
                  onBlur={ handleBlur }
                  onChange={ handleChange }
                  value={ values.role }
                  name="role"
                  error={ touched.role && !!errors.role }
                  helpertext={ touched.role && errors.role }
                >
                  <MenuItem value={ "MANAGER" }>{ t("types.roles.manager") }</MenuItem>
                  <MenuItem value={ "COMERCIAL" }>{ t("types.roles.comercial") }</MenuItem>
                </Select>
                { touched.role && errors.role && (
                  <FormHelperText sx={ { color: "#f44336" } }>
                    { errors.role }
                  </FormHelperText> // Aquí se muestra el mensaje de error
                ) }
              </FormControl>
              <LocalizationProvider
                dateAdapter={ AdapterDayjs }
              ></LocalizationProvider>
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
                  console.log(errors);
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

export default WorkersForm;
