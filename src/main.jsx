import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./Router";
import "./index.css";
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import global_es from "./utils/locale/es/global.json";
import global_en from "./utils/locale/en/global.json";

i18next.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    es: {
      translation: global_es,
    },
    en: {
      translation: global_en,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <AppRouter />
    </I18nextProvider>
  </React.StrictMode>
);
