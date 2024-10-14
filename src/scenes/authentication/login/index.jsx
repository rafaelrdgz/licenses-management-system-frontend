import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { loginWorker } from "../../../apis/WorkerAPI.js";
import { useState } from "react";
import { AuthContext } from "../../../utils/AuthContext.jsx";
import { useContext } from "react";
import React from "react";

export default function Login() {
  const [darkMode, setDarkMode] = React.useState(
    localStorage.getItem("theme") === "dark"
  );
  const { login } = useContext(AuthContext);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#90caf9" : "#1976d2",
      },
      secondary: {
        main: darkMode ? "#f48fb1" : "#dc004e",
      },
      background: {
        default: darkMode ? "#111520" : "#fff",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: darkMode ? "#111520" : "#fff",
          },
        },
      },
    },
  });

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const [incorrectData, setIncorrectData] = useState(false);

  const navigate = useNavigate();

  const checkoutSchema = yup.object().shape({
    email: yup
      .string()
      .email("El correo debe ser un correo válido")
      .required("El correo es requerido")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Correo no válido"),
    password: yup.string().required("La contraseña es requerida"),
  });

  const handleFormSubmit = async (values) => {
    setIncorrectData(false); // Resetea el estado antes de la solicitud

    try {
      const response = await loginWorker(values.email, values.password);

      // Verifica que el status sea 200 antes de acceder a response.data
      if (response.status === 200) {
        const { token } = response.data;
        login(token); // Almacenar solo el token
        navigate("/dashboard");
      }
    } catch (error) {
      setIncorrectData(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            sx={{ ml: 1, alignSelf: "end" }}
            onClick={handleThemeToggle}
            color="inherit"
          >
            {darkMode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
          </IconButton>
          <Avatar sx={{ m: 1, bgcolor: theme.palette.secondary.main }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar sesión
          </Typography>

          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
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
                {incorrectData && (
                  <Typography variant="body1" color="error">
                    Usuario o contraseña incorrectos
                  </Typography>
                )}
                <TextField
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  error={touched.email && errors.email}
                  helperText={touched.email && errors.email}
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Correo"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  error={touched.password && errors.password}
                  helperText={touched.password && errors.password}
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Iniciar sesión
                </Button>
              </form>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
}