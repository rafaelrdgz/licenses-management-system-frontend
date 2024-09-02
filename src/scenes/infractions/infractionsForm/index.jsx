import React, {useEffect, useState} from "react";
import {Header, Select, TextField} from "../../../components";
import {Box, Button, FormHelperText, InputLabel, useMediaQuery} from "@mui/material";
import {Formik} from "formik";
import * as yup from "yup";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {useNavigate, useParams} from "react-router-dom";
import {isValidIdDate, isValidLicense, isValidPersonID,} from "../../../utils/validations.js";
import {createInfraction, getInfractionById, updateInfraction} from "../../../apis/InfractionAPI.js";

function InfractionsForm() {
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
      .matches(
        /^[0-9]+$/,
        "El número de licencia no debe contener letras"
      )
      .required("El número de licencia es requerido")
      .min(6, "El número de licencia debe tener 6 dígitos")
      .max(6, "El número de licencia debe tener 6 dígitos")
      .test(
        "is-valid-license",
        "El número de identificación no se encuentra en el sistema",
        isValidLicense
      ),
    description: yup
      .string()
      .min(5, "La descripción debe tener al menos 5 caracteres")
      .max(50, "La descripción debe tener menos de 50 caracteres"),
    type: yup
      .string()
      .required("El tipo de infracción es requerido"),
    address: yup
      .string()
      .required("El lugar es requerido")
      .min(5, "La descripción debe tener al menos 5 caracteres")
      .max(25, "La descripción debe tener menos de 25 caracteres"),
    pointsDeducted: yup
      .number()
      .required("Los puntos son requeridos")
      .min(1, "Los puntos deben ser al menos 1")
      .max(36, "Los puntos deben ser menos de 36"),
    paid: yup
      .boolean()
      .required("El pago es requerido"),
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
        title={"INFRACCION " + info.id}
        subtitle={editing ? "Editar datos de infracción" : "Insertar nueva infracción"}
      />
      <Formik
        enableReinitialize
        validateOnMount
        initialValues={info}
        validationSchema={checkoutSchema}
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
                "& > div": {gridColumn: isNonMobile ? undefined : "span 4"},
              }}
            >{
              !editing &&
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Número de licencia"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.licenseid}
                name="licenseid"
                error={touched.licenseid && errors.licenseid}
                helperText={touched.licenseid && errors.licenseid}
                sx={{gridColumn: "span 2"}}
              />
            }
              {/*<TextField*/}
              {/*  fullWidth*/}
              {/*  variant="filled"*/}
              {/*  type="text"*/}
              {/*  label="Código de infracción"*/}
              {/*  onBlur={handleBlur}*/}
              {/*  onChange={handleChange}*/}
              {/*  value={values.id}*/}
              {/*  name="id"*/}
              {/*  error={touched.id && errors.id}*/}
              {/*  helperText={touched.id && errors.id}*/}
              {/*  sx={{ gridColumn: "span 2" }}*/}
              {/*/>*/}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Lugar"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={touched.address && errors.address}
                helperText={touched.address && errors.address}
                sx={{gridColumn: "span 2"}}
              />
              <FormControl variant="filled" sx={{gridColumn: "span 2"}}>
                <InputLabel id="demo-simple-select-filled-label">
                  Tipo
                </InputLabel>
                <Select
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.type}
                  name="type"
                  error={touched.type && errors.type}
                  helpertext={touched.type && errors.type}
                >
                  <MenuItem value={"LEVE"}>LEVE</MenuItem>
                  <MenuItem value={"GRAVE"}>GRAVE</MenuItem>
                  <MenuItem value={"MUY GRAVE"}>MUY GRAVE</MenuItem>
                </Select>
                {touched.type && errors.type && (
                  <FormHelperText sx={{color: '#f44336'}}>{errors.type}</FormHelperText> // Aquí se muestra el mensaje de error
                )}
              </FormControl>
              <FormControl variant="filled" sx={{gridColumn: "span 2"}}>
                <InputLabel id="demo-simple-select-filled-label">
                  Estado del pago
                </InputLabel>
                <Select
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.paid}
                  name="paid"
                  error={touched.paid && errors.paid}
                  helpertext={touched.paid && errors.paid}
                >
                  <MenuItem value={true}>Pagado</MenuItem>
                  <MenuItem value={false}>Pendiente</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Descripción"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={touched.description && errors.description}
                helperText={touched.description && errors.description}
                sx={{gridColumn: "span 2"}}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Puntos deducidos"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.pointsDeducted}
                name="pointsDeducted"
                error={touched.pointsDeducted && errors.pointsDeducted}
                helperText={touched.pointsDeducted && errors.pointsDeducted}
                sx={{gridColumn: "span 2"}}
              />
              {/*<LocalizationProvider dateAdapter={AdapterDayjs}>*/}
              {/*  <DatePicker*/}
              {/*    maxDate={dayjs()}*/}
              {/*    label="Fecha"*/}
              {/*    sx={{ gridColumn: "span 2" }}*/}
              {/*    value={values.date}*/}
              {/*    slotProps={{*/}
              {/*      textField: {*/}
              {/*        helperText: "MM/DD/YYYY",*/}
              {/*      },*/}
              {/*    }}*/}
              {/*  />*/}
              {/*</LocalizationProvider>*/}
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

export default InfractionsForm;
