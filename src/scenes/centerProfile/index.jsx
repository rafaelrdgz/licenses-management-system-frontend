import { Box, Typography, Avatar, useMediaQuery, Button, IconButton } from "@mui/material";
import { Header } from "../../components";
import { useState } from "react";
import centerLogo from "../../assets/images/logo.png";
import { Formik } from "formik";
import * as yup from "yup";
import { TextField } from "../../components";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const CenterProfile = () => {

  //cargar info con los datos de la bd
  const [info, setInfo] = useState({
    name: "Argon",
    code: "5634335",
    address: "calle 15 edifjdi ngjegn fdsd f3213 ",
    phone: "46535453",
    directorName: "dsadsadsa dsadsadsa dsadsa",
    humanResourcesName: "dsa dsa dsad sadsa",
    accountantName: "dssadsa dsadsadsa dsad",
    sydicateSecretaryName: "dsadsadsadsa ",
    logo: centerLogo,
  });

  const [disableEdit, setDisableEdit] = useState(true);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const initialValues = {
    name: info.name,
    code: info.code,
    address: info.address,
    phone: info.phone,
    directorName: info.directorName,
    humanResourcesName: info.humanResourcesName,
    accountantName: info.accountantName,
    sydicateSecretaryName: info.sydicateSecretaryName,
    logo: info.logo,
  };

  const checkoutSchema = yup.object().shape({
    name: yup
      .string()
      .required("El nombre es requerido")
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(50, "El nombre debe tener menos de 50 caracteres"),
    code: yup
      .string()
      .matches(/^[0-9]+$/, "El código debe ser un número")
      .required("El código es requerido")
      .min(4, "El código debe tener al menos 4 caracteres")
      .max(16, "El código debe tener menos de 16 caracteres"),
    address: yup
      .string()
      .required("La dirección es requerida")
      .min(10, "La dirección debe tener al menos 10 caracteres")
      .max(100, "La dirección debe tener menos de 100 caracteres"),
    phone: yup
      .string()
      .matches(/^[0-9]+$/, "El número de teléfono debe ser un número")
      .required("El número de teléfono es requerido")
      .min(6, "El número de teléfono debe tener al menos 6 caracteres")
      .max(12, "El número de teléfono debe tener menos de 12 caracteres"),
    directorName: yup
      .string()
      .required("El nombre del director es requerido")
      .min(5, "El nombre del director debe tener al menos 5 caracteres")
      .max(50, "El nombre del director debe tener menos de 50 caracteres"),
    humanResourcesName: yup
      .string()
      .required("El nombre del jefe de recursos humanos es requerido")
      .min(5, "El nombre del jefe de recursos humanos debe tener al menos 5 caracteres")
      .max(50, "El nombre del jefe de recursos humanos debe tener menos de 50 caracteres"),
    accountantName: yup
      .string()
      .required("El nombre del responsable de contabilidad es requerido")
      .min(5, "El nombre del responsable de contabilidad debe tener al menos 5 caracteres")
      .max(50, "El nombre del responsable de contabilidad debe tener menos de 50 caracteres"),
    sydicateSecretaryName: yup
      .string()
      .required("El nombre del secretario del sindicato es requerido")
      .min(5, "El nombre del secretario del sindicato debe tener al menos 5 caracteres")
      .max(50, "El nombre del secretario del sindicato debe tener menos de 50 caracteres"),
  });

  const handleFormSubmit = (values) => {
    const data = {
      ...(values),
      logo: info.logo,
    }//este es el objeto q se pasa al backend pa guardar en la bd
    console.log(data);
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg")) {
      const reader = new FileReader();
      reader.onload = () => {
        setInfo((prevState) => ({ ...prevState, logo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box m="20px">
      <Header title={"CENTRO"} subtitle={"Personalizar la información del centro"} />
      <Box display="flex" flexDirection="column" alignItems="center" mb={4} position="relative">
        <Avatar src={info.logo} sx={{ width: 100, height: 100 }} />
        {!disableEdit && (
          <IconButton
            sx={{ position: "absolute", marginLeft: "150px", cursor: "pointer" }}
            component="label"
          >
            <EditOutlinedIcon />
            <input type="file" accept="image/png, image/jpeg" hidden onChange={handleLogoChange} />
          </IconButton>
        )}
        <Typography variant="h1" mt={2}>
          {info.name}
        </Typography>
      </Box>
      <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))" sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}>
              <TextField
                {...(disableEdit && { disabled: true })}
                fullWidth
                variant="filled"
                type="text"
                label="Nombre"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={touched.name && errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                {...(disableEdit && { disabled: true })}
                fullWidth
                variant="filled"
                type="text"
                label="Código"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.code}
                name="code"
                error={touched.code && errors.code}
                helperText={touched.code && errors.code}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                {...(disableEdit && { disabled: true })}
                fullWidth
                variant="filled"
                type="text"
                label="Dirección"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={touched.address && errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                {...(disableEdit && { disabled: true })}
                fullWidth
                variant="filled"
                type="text"
                label="Número de teléfono"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                error={touched.phone && errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                {...(disableEdit && { disabled: true })}
                fullWidth
                variant="filled"
                type="text"
                label="Nombre del director"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.directorName}
                name="directorName"
                error={touched.directorName && errors.directorName}
                helperText={touched.directorName && errors.directorName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                {...(disableEdit && { disabled: true })}
                fullWidth
                variant="filled"
                type="text"
                label="Nombre del jefe de recursos humanos"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.humanResourcesName}
                name="humanResourcesName"
                error={touched.humanResourcesName && errors.humanResourcesName}
                helperText={touched.humanResourcesName && errors.humanResourcesName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                {...(disableEdit && { disabled: true })}
                fullWidth
                variant="filled"
                type="text"
                label="Nombre del responsable de contabilidad"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.accountantName}
                name="accountantName"
                error={touched.accountantName && errors.accountantName}
                helperText={touched.accountantName && errors.accountantName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                {...(disableEdit && { disabled: true })}
                fullWidth
                variant="filled"
                type="text"
                label="Nombre del secretario del sindicato"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.sydicateSecretaryName}
                name="sydicateSecretaryName"
                error={touched.sydicateSecretaryName && errors.sydicateSecretaryName}
                helperText={touched.sydicateSecretaryName && errors.sydicateSecretaryName}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" alignItems="center" justifyContent="end" mt="20px">
              <Button
                onClick={() => (disableEdit ? setDisableEdit(false) : setDisableEdit(true))}
                color="secondary"
                variant="contained"
              >
                Editar
              </Button>
              <Button sx={{ marginLeft: "10px" }} type="submit" color="secondary" variant="contained">
                Guardar
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CenterProfile;
