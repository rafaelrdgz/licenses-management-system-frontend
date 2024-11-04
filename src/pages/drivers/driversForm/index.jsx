import React, { useEffect, useState } from "react";
import { Header, Select, TextField } from "../../../components";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { getDriverById, updateDriver } from "../../../apis/DriversAPI.js";

import { useTranslation } from "react-i18next";

function DriversForm () {
  const [info, setInfo] = useState({
    id: "",
    name: "",
    lastNames: "",
    address: "",
    phoneNumber: "",
    email: "",
    licenseStatus: "",
  });

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const params = useParams();

  //Se carga el conductor de la bd y se asigna el valor con setInfo
  const loadDriver = async (id) => {
    const info = await getDriverById(id);
    console.log(info);
    setInfo(info);
  };

  useEffect(() => {
    if (params.id) {
      loadDriver(params.id);
    }
  }, [params.id]);

  const { t } = useTranslation();

  const checkoutSchema = yup.object().shape({
    name: yup
      .string()
      .required(t("form.driver.name.required"))
      .matches(
        /^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$/,
        t("form.driver.name.matches")
      )
      .min(3, t("form.driver.name.min"))
      .max(25, t("form.driver.name.max")),
    lastNames: yup
      .string()
      .required(t("form.driver.lastNames.required"))
      .matches(
        /^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$/,
        t("form.driver.lastNames.matches")
      )
      .min(5, t("form.driver.lastNames.min"))
      .max(50, t("form.driver.lastNames.max")),
    address: yup
      .string()
      .required(t("form.driver.address.required"))
      .min(10, t("form.driver.address.min"))
      .max(100, t("form.driver.address.max")),
    phoneNumber: yup
      .string()
      .required(t("form.driver.phoneNumber.required"))
      .matches(
        /^[0-9]+$/,
        t("form.driver.phoneNumber.matches")
      )
      .min(6, t("form.driver.phoneNumber.min"))
      .max(12, t("form.driver.phoneNumber.max")),
    email: yup
      .string()
      .email(t("form.driver.email.email"))
      .required(t("form.driver.email.required"))
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, t("form.driver.email.matches")),
    licenseStatus: yup
      .string()
      .required(t("form.driver.licenseStatus.required")),
  });

  const handleFormSubmit = async (values) => {
    console.log("Actualizando conductor:", values);
    const response = await updateDriver(params.id, values);
    console.log(response);
    navigate("/drivers");
  };

  return (
    <Box m="20px">
      <Header title={ t("drivers.title") + " " + info.id } subtitle={ t("drivers.editDriver") } />
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
              <FormControl variant="filled" sx={ { gridColumn: "span 2" } }>
                <InputLabel id="demo-simple-select-filled-label">
                  { t("types.licenseStatus") }
                </InputLabel>
                <Select
                  onBlur={ handleBlur }
                  onChange={ handleChange }
                  value={ values.licenseStatus }
                  name="licenseStatus"
                  error={ touched.licenseStatus && !!errors.licenseStatus }
                  helpertext={ touched.licenseStatus && errors.licenseStatus }
                >
                  <MenuItem value={ "VIGENTE" }>{ t("types.licenseStatusTypes.active") }</MenuItem>
                  <MenuItem value={ "VENCIDA" }>{ t("types.licenseStatusTypes.expired") }</MenuItem>
                  <MenuItem value={ "SUSPENDIDA" }>{ t("types.licenseStatusTypes.suspended") }</MenuItem>
                  <MenuItem value={ "REVOCADA" }>{ t("types.licenseStatusTypes.revoked") }</MenuItem>
                </Select>
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
                type="text"
                color="secondary"
                variant="contained"
                onClick={ () => {
                  console.log(errors);
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

export default DriversForm;
