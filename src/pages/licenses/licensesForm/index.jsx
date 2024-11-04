import React, { useEffect, useState } from "react";
import { Header, Select, TextField } from "../../../components/index.jsx";
import {
  Box,
  Button,
  FormHelperText,
  InputLabel,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import FormControl from "@mui/material/FormControl";
import { useNavigate, useParams } from "react-router-dom";
import {
  checkExamsDone,
  existsDriver,
  isValidIdDate,
  isValidPersonID,
} from "../../../utils/validations.js";
import { useTheme } from "@emotion/react";
import {
  createLicense,
  getLicenseById,
  getMissingCategories,
  updateLicense,
  updateLicenseWithCategory,
} from "../../../apis/LicensesAPI.js";
import { enqueueSnackbar, SnackbarProvider } from "notistack";

import { useTranslation } from "react-i18next";

function LicensesForm () {
  const { t } = useTranslation();

  const theme = useTheme();
  const restrictionsList = [
    t("types.restrictionsTypes.glasses"),
    t("types.restrictionsTypes.daylight"),
    t("types.restrictionsTypes.drivingRadioLimit"),
    t("types.restrictionsTypes.drivingAlone"),
    t("types.restrictionsTypes.speed"),
    t("types.restrictionsTypes.onlyUrban"),
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
    category: "",
    restrictions: "",
    points: 0,
  });

  const [categories, setCategories] = useState([
    "A1",
    "A",
    "B",
    "C1",
    "C",
    "D1",
    "D",
    "E",
    "F",
    "FE",
  ]);
  const cat = {
    A1: t("types.categoryLicense.A1"),
    A: t("types.categoryLicense.A"),
    B: t("types.categoryLicense.B"),
    C1: t("types.categoryLicense.C1"),
    C: t("types.categoryLicense.C"),
    D1: t("types.categoryLicense.D1"),
    D: t("types.categoryLicense.D"),
    E: t("types.categoryLicense.E"),
    F: t("types.categoryLicense.F"),
    FE: t("types.categoryLicense.FE"),
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const params = useParams();

  //Se carga el examen de la bd y se asigna el valor con setInfo
  const loadLicense = async (id) => {
    const info = await getLicenseById(id);
    console.log(info);
    setInfo({ ...info, category: "" });
    setEditing(true);
    const c = await getMissingCategories(params.id);
    console.log(c);
    setCategories(c);
  };

  const renewLicense = () => {
    const year = info.expirationDate.substring(0, 4);
    const date = info.expirationDate.replace(
      year,
      (parseInt(year) + 20).toString()
    );
    console.log(date);

    setInfo((prevInfo) => ({
      ...prevInfo,
      expirationDate: date,
      renewed: true,
    }));
    console.log(info);
    enqueueSnackbar(t("snackbarMessage.renewLicense"), { variant: "success" });
  };

  useEffect(() => {
    if (params.id) {
      loadLicense(params.id);
    }
  }, [params.id]);

  const checkoutSchema = yup.object().shape({
    driverId: yup
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
      )
      .test(
        "exist-driver",
        t("form.client.id.existPersonID"),
        existsDriver
      )
      .test(
        "exams-done",
        t("form.client.id.examsDone"),
        checkExamsDone
      ),
    category: yup.string().required(t("form.license.category.required")),
    points: yup
      .number()
      .required(t("form.license.points.required"))
      .moreThan(-1, t("form.license.points.moreThan")),
  });

  const handleFormSubmit = async () => {
    console.log(info);

    let response;
    if (editing) {
      if (info.category === "") response = await updateLicense(params.id, info);
      else {
        const year = info.expirationDate.substring(0, 4);
        const date = info.expirationDate.replace(
          year,
          (parseInt(year) + 20).toString()
        );
        console.log(info);
        response = await updateLicenseWithCategory(params.id, {
          ...info,
          expirationDate: date,
          renewed: true,
        });
      }
    } else {
      response = await createLicense(info);
    }

    console.log(response);
    navigate("/licenses");
  };

  const handleRestrictionsChange = (event) => {
    const value = event.target.value;
    console.log(value);
    setInfo((prevInfo) => ({
      ...prevInfo,
      restrictions: value.join(","),
    }));
  };

  return (
    <Box m="20px">
      <SnackbarProvider maxSnack={ 3 } />
      <Header
        title={ "LICENCIA " + info.id }
        subtitle={
          editing ? t("licenses.editLicense") : t("licenses.newLicense")
        }
      />
      { editing && !info.renewed && (
        <Button
          color="secondary"
          variant="contained"
          sx={ { mb: "10px" } }
          onClick={ renewLicense }
        >
          { t("licenses.renewLicense") }
        </Button>
      ) }
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
                  label={ t("types.driverID") }
                  onBlur={ handleBlur }
                  onChange={ (event) => {
                    setInfo((prevInfo) => ({
                      ...prevInfo,
                      driverId: event.target.value,
                    }));
                  } }
                  value={ values.driverId }
                  name="driverId"
                  error={ touched.driverId && !!errors.driverId }
                  helperText={ touched.driverId && errors.driverId }
                  sx={ { gridColumn: "span 2" } }
                />
              ) }
              { categories !== null && (
                <FormControl variant="filled" sx={ { gridColumn: "span 2" } }>
                  <InputLabel id="demo-simple-select-filled-label">
                    { editing ? t("licenses.addCategory") : t("types.category") }
                  </InputLabel>
                  <Select
                    onBlur={ handleBlur }
                    onChange={ (event) => {
                      setInfo((prevInfo) => ({
                        ...prevInfo,
                        category: event.target.value,
                      }));
                    } }
                    value={ values.category }
                    name="category"
                    error={ touched.category && !!errors.category }
                    helpertext={ touched.category && errors.category }
                  >
                    { categories.map((c) => (
                      <MenuItem key={ c } value={ c }>
                        { cat[c] }
                      </MenuItem>
                    )) }
                  </Select>
                  { touched.category && errors.category && (
                    <FormHelperText sx={ { color: "#f44336" } }>
                      { errors.category }
                    </FormHelperText>
                  ) }
                </FormControl>
              ) }
              <FormControl variant="filled" sx={ { gridColumn: "span 2" } }>
                <InputLabel id="demo-simple-select-filled-label">
                  { t("types.restrictions") }
                </InputLabel>
                <Select
                  multiple
                  value={ info.restrictions.split(",") }
                  onChange={ handleRestrictionsChange }
                  name="restrictions"
                  MenuProps={ MenuProps }
                >
                  { restrictionsList.map((name) => (
                    <MenuItem
                      key={ name }
                      value={ name }
                      style={ {
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? info.restrictions.indexOf(name) > -1
                              ? "green"
                              : "#2f2f2f"
                            : info.restrictions.indexOf(name) > -1
                              ? "green"
                              : "#ffffff",
                      } }
                    >
                      { name }
                    </MenuItem>
                  )) }
                </Select>
              </FormControl>
              { editing && (
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label={ t("types.points") }
                  onBlur={ handleBlur }
                  onChange={ (event) => {
                    setInfo((prevInfo) => ({
                      ...prevInfo,
                      points: event.target.value,
                    }));
                  } }
                  value={ info.points }
                  name="points"
                  error={ touched.points && !!errors.points }
                  helperText={ touched.points && errors.points }
                  sx={ { gridColumn: "span 2" } }
                />
              ) }
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
                      ("driverId" in errors || "category" in errors) &&
                      Object.keys(errors).length < 3)
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

export default LicensesForm;
