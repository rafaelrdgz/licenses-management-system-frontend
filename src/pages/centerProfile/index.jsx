import {
  Avatar,
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Header, TextField } from "../../components";
import React, { useRef, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import {
  fetchCenterPdf,
  getCenter,
  updateCenter,
} from "../../apis/CenterAPI.js";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../utils/AuthContext.jsx";
import LoadingButton from "@mui/lab/LoadingButton";
import { useTranslation } from "react-i18next";

const CenterProfile = () => {
  const { user } = useContext(AuthContext);
  const [info, setInfo] = useState({
    accountantName: "",
    address: "",
    code: "",
    directorName: "",
    humanResourcesName: "",
    logo: "",
    name: "",
    phone: 0,
    syndicateSecretaryName: "",
  });
  const [imageUrl, setImageUrl] = useState("");
  const [disableEdit, setDisableEdit] = useState(true);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const reportRef = useRef(null);
  const { t } = useTranslation();
  const loadCenter = async () => {
    try {
      const data = await getCenter();
      console.log(data);
      setInfo(data);
    } catch (error) {
      console.error("Error fetching center:", error);
    }
  };

  const fetchImage = async () => {
    try {
      const response = await axios.get("/image/logo-123456789.png", {
        responseType: "blob", // Asegúrate de recibir el archivo como blob
      });

      console.log(response);
      // Crear una URL local para la imagen
      const imageUrl = URL.createObjectURL(response.data);
      console.log(imageUrl);
      setImageUrl(imageUrl);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  React.useEffect(() => {
    loadCenter();
    //fetchImage();
  }, []);

  const checkoutSchema = yup.object().shape({
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
    humanResourcesName: yup
      .string()
      .matches(
        /^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$/,
        t("form.entity.humanResourcesName.matches")
      )
      .required(t("form.entity.humanResourcesName.required"))
      .min(
        5,
        t("form.entity.humanResourcesName.min")
      )
      .max(
        50,
        t("form.entity.humanResourcesName.max")
      ),
    accountantName: yup
      .string()
      .matches(
        /^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$/,
        t("form.entity.accountantName.matches")
      )
      .required(t("form.entity.accountantName.required"))
      .min(
        5,
        t("form.entity.accountantName.min")
      )
      .max(
        50,
        t("form.entity.accountantName.max")
      ),
    syndicateSecretaryName: yup
      .string()
      .matches(
        /^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$/,
        t("form.entity.syndicateSecretaryName.matches")
      )
      .required(t("form.entity.syndicateSecretaryName.required"))
      .min(
        5,
        t("form.entity.syndicateSecretaryName.min")
      )
      .max(
        50,
        t("form.entity.syndicateSecretaryName.max")
      ),
    code: yup
      .string()
      .required(t("form.entity.code.required"))
      .min(6, t("form.entity.code.min"))
      .max(36, t("form.entity.code.max")),
  });

  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (values) => {
    const data = values;
    try {
      const response = await updateCenter(data);
      console.log(data);
      console.log(response);
    } catch (error) {
      console.error("Error updating center:", error);
    }
    setDisableEdit(true);
    setInfo(values);
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (
      file &&
      (file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg")
    ) {
      // Muestra la imagen en el Avatar
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);

      // Guarda la imagen para el form submission
      setInfo({ ...info, logoFile: file });
    }
  };

  const handleExportPdf = async () => {
    setLoading(true);
    await fetchCenterPdf(info);
    setLoading(false);
  };

  return (
    <Box m="20px">
      <Header title={ t("centerProfile.title") } subtitle={ t("centerProfile.subtitle") } />
      <LoadingButton
        loading={ loading }
        color="secondary"
        variant="contained"
        onClick={ handleExportPdf }
      >
        { t("reports.export") }
      </LoadingButton>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mb={ 4 }
        position="relative"
        ref={ reportRef }
      >
        <Typography variant="h1" mt={ 2 }>
          { info.name }
        </Typography>
      </Box>
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
                { ...(disableEdit && { disabled: true }) }
                fullWidth
                variant="filled"
                type="text"
                label={ t("types.code") }
                onBlur={ handleBlur }
                onChange={ handleChange }
                value={ values.code }
                name="code"
                error={ touched.entityCode && !!errors.entityCode }
                helperText={ touched.entityCode && errors.entityCode }
                sx={ { gridColumn: "span 2" } }
              />
              <TextField
                { ...(disableEdit && { disabled: true }) }
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
                { ...(disableEdit && { disabled: true }) }
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
              <TextField
                { ...(disableEdit && { disabled: true }) }
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
                { ...(disableEdit && { disabled: true }) }
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
                { ...(disableEdit && { disabled: true }) }
                fullWidth
                variant="filled"
                type="text"
                label={ t("types.humanResourcesName") }
                onBlur={ handleBlur }
                onChange={ handleChange }
                value={ values.humanResourcesName }
                name="humanResourcesName"
                error={
                  touched.humanResourcesName && !!errors.humanResourcesName
                }
                helperText={
                  touched.humanResourcesName && errors.humanResourcesName
                }
                sx={ { gridColumn: "span 2" } }
              />
              <TextField
                { ...(disableEdit && { disabled: true }) }
                fullWidth
                variant="filled"
                type="text"
                label={ t("types.accountantName") }
                onBlur={ handleBlur }
                onChange={ handleChange }
                value={ values.accountantName }
                name="accountantName"
                error={ touched.accountantName && !!errors.accountantName }
                helperText={ touched.accountantName && errors.accountantName }
                sx={ { gridColumn: "span 2" } }
              />
              <TextField
                { ...(disableEdit && { disabled: true }) }
                fullWidth
                variant="filled"
                type="text"
                label={ t("types.syndicateSecretaryName") }
                onBlur={ handleBlur }
                onChange={ handleChange }
                value={ values.syndicateSecretaryName }
                name="syndicateSecretaryName"
                error={
                  touched.syndicateSecretaryName &&
                  !!errors.syndicateSecretaryName
                }
                helperText={
                  touched.syndicateSecretaryName &&
                  errors.syndicateSecretaryName
                }
                sx={ { gridColumn: "span 2" } }
              />
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="end"
              mt="20px"
            >
              { user && user.role === "MANAGER" && disableEdit && (
                <Button
                  onClick={ () =>
                    disableEdit ? setDisableEdit(false) : setDisableEdit(true)
                  }
                  color="secondary"
                  variant="contained"
                >
                  { t("actions.edit") }
                </Button>
              ) }
              { !disableEdit && (
                <Button
                  type="submit"
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
              ) }
            </Box>
          </form>
        ) }
      </Formik>
    </Box>
  );
};

export default CenterProfile;
