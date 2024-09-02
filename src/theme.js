import {createTheme} from "@mui/material";
import {createContext, useEffect, useMemo, useState} from "react";

// Color Design Tokens
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
      gray: {
        100: "#d1d1d1",
        200: "#a3a3a3",
        300: "#858585",
        400: "#666666",
        500: "#4c4c4c",
        600: "#393939",
        700: "#292929",
        800: "#1a1a1a",
        900: "#0d0d0d"
      },
      primary: {
        100: "#c4c6cc",
        200: "#8a8d9b",
        300: "#525469",
        400: "#292a38",
        500: "#111520",
        600: "#0e111b",
        700: "#0a0d15",
        800: "#07090f",
        900: "#030509"
      },
      greenAccent: {
        100: "#ccece8",
        200: "#99d8d1",
        300: "#66c5ba",
        400: "#33b2a2",
        500: "#00a08b",
        600: "#008073",
        700: "#00605b",
        800: "#004043",
        900: "#00202a"
      },
      redAccent: {
        100: "#f6d0cf",
        200: "#ec9f9f",
        300: "#e26e6e",
        400: "#d83d3d",
        500: "#cf0d0d",
        600: "#a50b0b",
        700: "#7c0808",
        800: "#520505",
        900: "#290303"
      },
      blueAccent: {
        100: "#d6e4f5",
        200: "#adc9eb",
        300: "#84aee0",
        400: "#5b93d6",
        500: "#3278cc",
        600: "#285f9f",
        700: "#1f4673",
        800: "#152d47",
        900: "#0a1624"
      },
    }
    : {
      gray: {
        100: "#141414",
        200: "#292929",
        300: "#3d3d3d",
        400: "#525252",
        500: "#666666",
        600: "#858585",
        700: "#a3a3a3",
        800: "#c2c2c2",
        900: "#e0e0e0",
      },
      primary: {
        100: "#040509",
        200: "#080b12",
        300: "#0c101b",
        400: "#fcfcfc",
        500: "#f2f0f0",
        600: "#434957",
        700: "#727681",
        800: "#a1a4ab",
        900: "#d0d1d5",
      },
      greenAccent: {
        100: "#0f2922",
        200: "#1e5245",
        300: "#2e7c67",
        400: "#3da58a",
        500: "#4cceac",
        600: "#70d8bd",
        700: "#94e2cd",
        800: "#b7ebde",
        900: "#dbf5ee",
      },
      redAccent: {
        100: "#2c100f",
        200: "#58201e",
        300: "#832f2c",
        400: "#af3f3b",
        500: "#db4f4a",
        600: "#e2726e",
        700: "#e99592",
        800: "#f1b9b7",
        900: "#f8dcdb",
      },
      blueAccent: {
        100: "#e1e2fe",
        200: "#c3c6fd",
        300: "#a4a9fc",
        400: "#868dfb",
        500: "#6870fa",
        600: "#535ac8",
        700: "#3e4396",
        800: "#2a2d64",
        900: "#151632",
      },
    }),
});

// Mui Theme Settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);

  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
          primary: {
            main: colors.primary[500],
          },
          secondary: {
            main: colors.greenAccent[500],
          },
          neutral: {
            dark: colors.gray[700],
            main: colors.gray[500],
            light: colors.gray[100],
          },
          background: {
            default: colors.primary[500],
          },
        }
        : {
          primary: {
            main: colors.primary[100],
          },
          secondary: {
            main: colors.greenAccent[500],
          },
          neutral: {
            dark: colors.gray[700],
            main: colors.gray[500],
            light: colors.gray[100],
          },
          background: {
            default: colors.primary[500],
          },
        }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// Context For Color Mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {
  },
});

export const useMode = () => {
  const [mode, setMode] = useState(() => {
    // Obtén el tema del almacenamiento local o usa "dark" como predeterminado
    const localTheme = window.localStorage.getItem('theme');
    return localTheme ? localTheme : 'dark';
  });

  // Guarda el tema en el almacenamiento local cuando el modo cambia
  useEffect(() => {
    window.localStorage.setItem('theme', mode);
  }, [mode]);

  const colorMode = useMemo(() => ({
    toggleColorMode: () =>
      setMode((prev) => (prev === "light" ? "dark" : "light")),
  }));

  const theme = useMemo(() => createTheme(themeSettings(mode), [mode]));

  return [theme, colorMode];
};