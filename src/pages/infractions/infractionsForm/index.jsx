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
  isValidIdDate,
  isValidLicense,
  isValidPersonID,
} from "../../../utils/validations.js";
import {
  createInfraction,
  getInfractionById,
  updateInfraction,
} from "../../../apis/InfractionAPI.js";

import { useTranslation } from "react-i18next";

function InfractionsForm () {

  const { t } = useTranslation();
  const [editing, setEditing] = useState(false);

  const [info, setInfo] = useState({
    licenseid: "",
    id: "",
    date: "",
    address: "",
    description: "",
    pointsDeducted: "",
    type: "",
    paid: false,
  });

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const params = useParams();

  //Se carga el examen de la bd y se asigna el valor con setInfo
  const loadInfraction = async (id) => {
    const info = await getInfractionById(id);
    console.log(info);
    setInfo(info);
    setEditing(true);
  };

  useEffect(() => {
    if (params.id) {
      loadInfraction(params.id);
    }
  }, [params.id]);

  const checkoutSchema = yup.object().shape({
    licenseid: yup
      .string()
      .matches(/^[0-9]+$/, t("form.infraction.licenseid.matches"))
      .required(t("form.infraction.licenseid.required"))
      .min(6, t("form.infraction.licenseid.min"))
      .max(6, t("form.infraction.licenseid.max"))
      .test(
        "is-valid-license",
        t("form.infraction.licenseid.test.is-valid-license"),
        isValidLicense
      ),
    description: yup
      .string()
      .min(5, t("form.infraction.description.min"))
      .max(50, t("form.infraction.description.max")),
    type: yup.string().required(t("form.infraction.type.required")),
    address: yup
      .string()
      .required(t("form.infraction.address.required"))
      .min(5, t("form.infraction.address.min"))
      .max(25, t("form.infraction.address.max")),
    pointsDeducted: yup
      .number()
      .required(t("form.infraction.pointsDeducted.required"))
      .min(1, t("form.infraction.pointsDeducted.min"))
      .max(36, t("form.infraction.pointsDeducted.max")),
    paid: yup.boolean().required(t("form.infraction.paid.required")),
  });

  const handleFormSubmit = async (values) => {
    let response;
    if (editing) {
      console.log("Actualizando infracción:", values);
      response = await updateInfraction(params.id, values);
    } else {
      console.log("Creando nueva infracción:", values);
      response = await createInfraction(values);
    }
    console.log(response);
    navigate("/infractions");
  };

  return (
    <Box m="20px">
      <Header
        title={ t("infractions.title") + " " + info.id }
        subtitle={
          editing ? t("infractions.editInfraction") : t("infractions.createInfraction")
        }
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
                  label={ t("types.licenseNumber") }
                  onBlur={ handleBlur }
                  onChange={ handleChange }
                  value={ values.licenseid }
                  name="licenseid"
                  error={ touched.licenseid && !!errors.licenseid }
                  helperText={ touched.licenseid && errors.licenseid }
                  sx={ { gridColumn: "span 2" } }
                />
              ) }
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
                  <MenuItem value={ "LEVE" }>{ t("types.infractionTypes.minor") }</MenuItem>
                  <MenuItem value={ "GRAVE" }>{ t("types.infractionTypes.serious") }</MenuItem>
                  <MenuItem value={ "MUY GRAVE" }>{ t("types.infractionTypes.verySerious") }</MenuItem>
                </Select>
                { touched.type && errors.type && (
                  <FormHelperText sx={ { color: "#f44336" } }>
                    { errors.type }
                  </FormHelperText>
                ) }
              </FormControl>
              <FormControl variant="filled" sx={ { gridColumn: "span 2" } }>
                <InputLabel id="demo-simple-select-filled-label">
                  { t("types.paid") }
                </InputLabel>
                <Select
                  onBlur={ handleBlur }
                  onChange={ handleChange }
                  value={ values.paid }
                  name="paid"
                  error={ touched.paid && !!errors.paid }
                  helpertext={ touched.paid && errors.paid }
                >
                  <MenuItem value={ true }>{ t("types.paid") }</MenuItem>
                  <MenuItem value={ false }>{ t("types.unpaid") }</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={ t("types.description") }
                onBlur={ handleBlur }
                onChange={ handleChange }
                value={ values.description }
                name="description"
                error={ touched.description && !!errors.description }
                helperText={ touched.description && errors.description }
                sx={ { gridColumn: "span 2" } }
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label={ t("types.pointsDeducted") }
                onBlur={ handleBlur }
                onChange={ handleChange }
                value={ values.pointsDeducted }
                name="pointsDeducted"
                error={ touched.pointsDeducted && !!errors.pointsDeducted }
                helperText={ touched.pointsDeducted && errors.pointsDeducted }
                sx={ { gridColumn: "span 2" } }
              />
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

export default InfractionsForm;
