import React, {useEffect, useState} from "react";
import {Header, Select, TextField} from "../../../components/index.jsx";
import {Box, Button, FormHelperText, InputLabel, MenuItem, useMediaQuery,} from "@mui/material";
import {Formik} from "formik";
import * as yup from "yup";
import FormControl from "@mui/material/FormControl";
import {useNavigate, useParams} from "react-router-dom";
import {checkExamsDone, existsDriver, isValidIdDate, isValidPersonID,} from "../../../utils/validations.js";
import {useTheme} from "@emotion/react";
import {
  createLicense,
  getLicenseById,
  getMissingCategories,
  updateLicense,
  updateLicenseWithCategory,
} from "../../../apis/LicensesAPI.js";
import {enqueueSnackbar, SnackbarProvider} from "notistack";


function LicensesForm() {
  const theme = useTheme();
  const restrictionsList = ["Uso de lentes", "Conducción diurna", "Límite del radio de conducción", "Conducción sin acompañantes", "Limitación de velocidad", "Solo conducción en zonas urbanas",];

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP, width: 250,
      },
    },
  };

  const [editing, setEditing] = useState(false);

  const [info, setInfo] = useState({
    id: "", driverId: "", category: "", restrictions: "", points: 0,
  });

  const [categories, setCategories] = useState(["A1", "A", "B", "C1", "C", "D1", "D", "E", "F", "FE"])
  const cat = {
    A1: "Ciclomotor",
    A: "Motocicleta",
    B: "Automóvil",
    C1: "Camión de hasta 7500 kg",
    C: "Camión de más de 7500 kg",
    D1: "Microbus",
    D: "Omnibus",
    E: "Articulado",
    F: "Agrícola, Industrial o de Construcción",
    FE: "Tractor con remolque"
  }

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const params = useParams();

  //Se carga el examen de la bd y se asigna el valor con setInfo
  const loadLicense = async (id) => {
    const info = await getLicenseById(id);
    console.log(info);
    setInfo({...info, category: ""});
    setEditing(true);
    const c = await getMissingCategories(params.id)
    console.log(c)
    setCategories(c)
  };

  const renewLicense = () => {
    const year = info.expirationDate.substring(0, 4);
    const date = info.expirationDate.replace(year, (parseInt(year) + 20).toString());
    console.log(date);

    setInfo((prevInfo) => ({
      ...prevInfo, expirationDate: date, renewed: true,
    }));
    console.log(info);
    enqueueSnackbar('Licencia renovada', {variant: 'success'})
  };

  useEffect(() => {
    if (params.id) {
      loadLicense(params.id);
    }
  }, [params.id]);


  const checkoutSchema = yup.object().shape({
    driverId: yup
      .string()
      .matches(/^[0-9]+$/, "El número de indentificación no debe contener letras")
      .required("El número de indentificación es requerido")
      .min(11, "El número de indentificación debe tener 11 dígitos")
      .max(11, "El número de indentificación debe tener 11 dígitos")
      .test("is-valid-id", "El número de indentificación no es válido", isValidIdDate)
      .test("is-valid-person", "El número de identificación no se encuentra en el sistema", isValidPersonID)
      .test("exist-driver", "La persona con ese Id ya posee una licencia", existsDriver)
      .test("exams-done", "La persona no tiene aprobados los exámenes", checkExamsDone),
    category: yup.string().required("El tipo de categoría es requerido"),
    points: yup
      .number()
      .required("Los puntos son requeridos")
      .moreThan(-1, "Debe ingresar un valor positivo"),
  });

  const handleFormSubmit = async () => {
    console.log(info);

    let response;
    if (editing) {
      if (info.category === "")
        response = await updateLicense(params.id, info);
      else{
        const year = info.expirationDate.substring(0, 4);
        const date = info.expirationDate.replace(year, (parseInt(year) + 20).toString());
        console.log(info);
        response = await updateLicenseWithCategory(params.id, {...info, expirationDate: date, renewed: true})
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
      ...prevInfo, restrictions: value.join(","),
    }));
  };

  return (<Box m="20px">
    <SnackbarProvider maxSnack={3}/>
    <Header
      title={"LICENCIA " + info.id}
      subtitle={editing ? "Editar datos de licencia" : "Insertar nueva licencia"}
    />
    {editing && !info.renewed && (<Button
      color="secondary"
      variant="contained"
      sx={{mb: "10px"}}
      onClick={renewLicense}
    >
      Renovar licencia
    </Button>)}
    <Formik
      enableReinitialize
      validateOnMount
      initialValues={info}
      validationSchema={checkoutSchema}
    >
      {({
          values, errors, touched, handleBlur, handleChange, handleSubmit,
        }) => (<form onSubmit={handleSubmit}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": {gridColumn: isNonMobile ? undefined : "span 4"},
          }}
        >
          {!editing && (<TextField
            fullWidth
            variant="filled"
            type="text"
            label="Número de identificación del conductor"
            onBlur={handleBlur}
            onChange={(event) => {
              setInfo((prevInfo) => ({
                ...prevInfo, driverId: event.target.value,
              }));
            }}
            value={values.driverId}
            name="driverId"
            error={touched.driverId && errors.driverId}
            helperText={touched.driverId && errors.driverId}
            sx={{gridColumn: "span 2"}}
          />)}
          {categories !== null && (
            <FormControl variant="filled" sx={{gridColumn: "span 2"}}>
              <InputLabel id="demo-simple-select-filled-label">
                {editing ? "Agregar Categoría" : "Categoría"}
              </InputLabel>
              <Select
                onBlur={handleBlur}
                onChange={(event) => {
                  setInfo((prevInfo) => ({
                    ...prevInfo, category: event.target.value,
                  }));
                }}
                value={values.category}
                name="category"
                error={touched.category && errors.category}
                helpertext={touched.category && errors.category}
              >{
                categories.map(c =>
                  <MenuItem value={c}>{cat[c]}</MenuItem>
                )
              }
                {/*<MenuItem value={"A1"}>Ciclomotor</MenuItem>*/}
                {/*<MenuItem value={"A"}>Motocicleta</MenuItem>*/}
                {/*<MenuItem value={"B"}>Automóvil</MenuItem>*/}
                {/*<MenuItem value={"C1"}>Camión de hasta 7500 kg</MenuItem>*/}
                {/*<MenuItem value={"C"}>Camión de más de 7500 kg</MenuItem>*/}
                {/*<MenuItem value={"D1"}>Microbus</MenuItem>*/}
                {/*<MenuItem value={"D"}>Omnibus</MenuItem>*/}
                {/*<MenuItem value={"E"}>Articulado</MenuItem>*/}
                {/*<MenuItem value={"F"}>*/}
                {/*  Agrícola, Industrial o de Construcción*/}
                {/*</MenuItem>*/}
                {/*<MenuItem value={"FE"}>Tractor con remolque</MenuItem>*/}
              </Select>
              {touched.category && errors.category && (<FormHelperText sx={{color: "#f44336"}}>
                  {errors.category}
                </FormHelperText> // Aquí se muestra el mensaje de error
              )}
            </FormControl>
          )
          }
          <FormControl variant="filled" sx={{gridColumn: "span 2"}}>
            <InputLabel id="demo-simple-select-filled-label">
              Restricciones
            </InputLabel>
            <Select
              multiple
              value={info.restrictions.split(",")}
              onChange={handleRestrictionsChange}
              name="restrictions"
              MenuProps={MenuProps}
            >
              {restrictionsList.map((name) => (<MenuItem
                key={name}
                value={name}
                style={{
                  backgroundColor: theme.palette.mode === "dark" ? info.restrictions.indexOf(name) > -1 ? "green" : "#2f2f2f" : info.restrictions.indexOf(name) > -1 ? "green" : "#ffffff",
                }}
              >
                {name}
              </MenuItem>))}
            </Select>
          </FormControl>
          {editing && (<TextField
            fullWidth
            variant="filled"
            type="number"
            label="Puntos"
            onBlur={handleBlur}
            onChange={(event) => {
              setInfo((prevInfo) => ({
                ...prevInfo, points: event.target.value,
              }));
            }}
            value={info.points}
            name="points"
            error={touched.points && errors.points}
            helperText={touched.points && errors.points}
            sx={{gridColumn: "span 2"}}
          />)}
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disabled
                  format="DD/MM/YYYY"
                  label="Fecha de emisión"
                  sx={{ gridColumn: "span 2" }}
                  value={info.issueDate}
                  slotProps={{
                    textField: {
                      helperText: "DD/MM/YYYY",
                    },
                  }}
                />
                <DatePicker
                  disabled
                  format="DD/MM/YYYY"
                  label="Fecha de expiración"
                  sx={{ gridColumn: "span 2" }}
                  value={info.expirationDate}
                  slotProps={{
                    textField: {
                      helperText: "DD/MM/YYYY",
                    },
                  }}
                />
              </LocalizationProvider> */}
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
            onClick={() => {
              console.log(errors);
              if (Object.keys(errors).length === 0 || (editing && ("driverId" in errors || "category" in errors) && Object.keys(errors).length < 3)) handleFormSubmit(values);
            }}
          >
            Guardar
          </Button>
        </Box>
      </form>)}
    </Formik>
  </Box>);
}

export default LicensesForm;
