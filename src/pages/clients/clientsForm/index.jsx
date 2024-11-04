import React, { useEffect, useState } from "react";
import { Header, TextField } from "../../../components";
import { Box, Button, useMediaQuery } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { isValidIdDate, existPersonID } from "../../../utils/validations.js";
import { useTranslation } from "react-i18next";
import {
  createClient,
  getClientById,
  updateClient,
} from "../../../apis/ClientAPI.js";

function ClientsForm () {
  const { t } = useTranslation();

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
        t("form.client.id.existPersonID"),
        existPersonID
      ),
    name: yup
      .string()
      .required(t("form.client.name.required"))
      .matches(
        /^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$/,
        t("form.client.name.matches")
      )
      .min(3, t("form.client.name.min"))
      .max(25, t("form.client.name.max")),
    lastNames: yup
      .string()
      .required(t("form.client.lastNames.required"))
      .matches(
        /^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$/,
        t("form.client.lastNames.matches")
      )
      .min(5, t("form.client.lastNames.min"))
      .max(50, t("form.client.lastNames.max")),
    address: yup
      .string()
      .required(t("form.client.address.required"))
      .min(10, t("form.client.address.min"))
      .max(100, t("form.client.address.max")),
    phoneNumber: yup
      .string()
      .required(t("form.client.phoneNumber.required"))
      .matches(
        /^[0-9]+$/,
        t("form.client.phoneNumber.matches")
      )
      .min(8, t("form.client.phoneNumber.min"))
      .max(8, t("form.client.phoneNumber.max")),
    email: yup
      .string()
      .email(t("form.client.email.email"))
      .required(t("form.client.email.required"))
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, t("form.client.email.matches")),
  });

  const handleFormSubmit = async (values) => {
    let response;
    if (editing) {
      console.log("Actualizando cliente:", values);
      response = await updateClient(params.id, values);
    } else {
      const data = { ...values, bornDate: getDate(values.id) };
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
        title={ t("clients.title") + " " + info.id }
        subtitle={ editing ? t("form.edit") : t("clients.createClient") }
      />
      <Formik
        enableReinitialize
        validateOnMount
        initialValues={ info }
        validationSchema={ checkoutSchema }
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
                  label={ t("types.clientID") }
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
                type="text"
                label={ t("types.phoneNumber") }
                onBlur={ handleBlur }
                onChange={ handleChange }
                value={ values.phoneNumber }
                name="phoneNumber"
                error={ touched.phoneNumber && !!errors.phoneNumber }
                helperText={ touched.phoneNumber && errors.phoneNumber }
                sx={ { gridColumn: "span 2" } }
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={ t("types.address") }
                onBlur={ handleBlur }
                onChange={ handleChange }
                value={ values.address }
                name="address"
                error={ touched.address && !!errors.address }
                helperText={ touched.address && errors.address }
                sx={ { gridColumn: "span 2" } }
              />
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
                type="text"
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

export default ClientsForm;
