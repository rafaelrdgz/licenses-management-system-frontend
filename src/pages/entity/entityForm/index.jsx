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

import { useTranslation } from "react-i18next";

function EntityForm () {

  const { t } = useTranslation();
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
    //   .matches(/^[0-9]+$/, t("form.entity.code.matches"))
    //   .required(t("form.entity.code.required"))
    //   .min(6, t("form.entity.code.min"))
    //   .max(16, t("form.entity.code.max")),
    name: yup
      .string()
      .matches(
        /^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$/,
        t("form.entity.name.matches")
      )
      .required(t("form.entity.name.required"))
      .min(3, t("form.entity.name.min"))
      .max(50, t("form.entity.name.max")),
    address: yup
      .string()
      .required(t("form.entity.address.required"))
      .min(10, t("form.entity.address.min"))
      .max(100, t("form.entity.address.max")),
    phone: yup
      .string()
      .matches(
        /^[0-9]+$/,
        t("form.entity.phone.matches")
      )
      .required(t("form.entity.phone.required"))
      .min(8, t("form.entity.phone.min"))
      .max(8, t("form.entity.phone.max")),
    directorName: yup
      .string()
      .matches(
        /^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$/,
        t("form.entity.directorName.matches")
      )
      .required(t("form.entity.directorName.required"))
      .min(5, t("form.entity.directorName.min"))
      .max(50, t("form.entity.directorName.max")),
    email: yup
      .string()
      .email(t("form.entity.email.email"))
      .required(t("form.entity.email.required"))
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, t("form.entity.email.matches")),
    type: yup.string().required(t("form.entity.type.required")),
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
        title={ t("entities.title") + info.code }
        subtitle={ editing ? t("entities.editEntity") : t("entities.newEntity") }
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
                label={ t("types.phoneNumber") }
                onBlur={ handleBlur }
                onChange={ handleChange }
                value={ values.phone }
                name="phone"
                error={ touched.phone && !!errors.phone }
                helperText={ touched.phone && errors.phone }
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
                label={ t("types.directorName") }
                onBlur={ handleBlur }
                onChange={ handleChange }
                value={ values.directorName }
                name="directorName"
                error={ touched.directorName && !!errors.directorName }
                helperText={ touched.directorName && errors.directorName }
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
              <FormControl variant="filled" sx={ { gridColumn: "span 2" } }>
                <InputLabel id="demo-simple-select-filled-label">
                  { t("types.type") }
                </InputLabel>
                <Select
                  onBlur={ handleBlur }
                  onChange={ handleChange }
                  value={ values.type }
                  name="type"
                  error={ touched.type && !!errors.type }
                  helpertext={ touched.type && errors.type }
                >
                  <MenuItem value={ "AUTOESCUELA" }>{ t("types.entityType.drivingSchool") }</MenuItem>
                  <MenuItem value={ "CLINICA" }>{ t("types.entityType.clinic") }</MenuItem>
                </Select>
                { touched.type && errors.type && (
                  <FormHelperText sx={ { color: "#f44336" } }>
                    { errors.type }
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
                type="text"
                color="secondary"
                variant="contained"
                onClick={ () => {
                  if (Object.keys(errors).length === 0)
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

export default EntityForm;
