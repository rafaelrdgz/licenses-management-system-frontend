import axios from "axios";
import { getToken } from "../utils/AuthContext";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getDriverReport = async (driverId) => {
  try {
    const response = await axios.get(`${BASE_URL}/driver_report/${driverId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching report:", error);
    return { error: error.response?.data?.message || error.message };
  }
};

export const fetchDriverPdf = async (info) => {
  const token = getToken();
  try {
    const response = await axios.post(
      `${BASE_URL}/driver_report_pdf/`,
      { info },
      {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      }
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "Ficha_de_Conductor.pdf");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  } catch (error) {
    console.error("Error al exportar el PDF:", error);
  }
};

export const getLicensesByDateRange = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${BASE_URL}/licenses_report`, {
      params: { startDate, endDate },
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching licenses:", error);
    return { error: error.response?.data?.message || error.message };
  }
};

export const fetchLicensesByDateRangePdf = async (info) => {
  const token = getToken();
  try {
    const response = await axios.post(
      `${BASE_URL}/licenses_report_pdf/`,
      { info },
      {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      }
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "Licencias_emitidas.pdf");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  } catch (error) {
    console.error("Error al exportar el PDF:", error);
  }
};

export const getExamsByDateRange = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${BASE_URL}/exams_report`, {
      params: { startDate, endDate },
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching exams:", error);
    return { error: error.response?.data?.message || error.message };
  }
};

export const fetchExamsByDateRangePdf = async (info) => {
  const token = getToken();
  try {
    const response = await axios.post(
      `${BASE_URL}/exams_report_pdf/`,
      { info },
      {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      }
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "Examenes_realizados.pdf");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  } catch (error) {
    console.error("Error al exportar el PDF:", error);
  }
};

export const getInfractionsByDateRange = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${BASE_URL}/infractions_report`, {
      params: { startDate, endDate },
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching infractions:", error);
    return { error: error.response?.data?.message || error.message };
  }
};

export const fetchInfractionsByDateRangePdf = async (info) => {
  const token = getToken();
  try {
    const response = await axios.post(
      `${BASE_URL}/infractions_report_pdf/`,
      { info },
      {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      }
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "Infracciones registradas.pdf");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  } catch (error) {
    console.error("Error al exportar el PDF:", error);
  }
};

export const getExpiredLicensesByDateRange = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${BASE_URL}/expired_licenses_report`, {
      params: { startDate, endDate },
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching expired licenses:", error);
    return { error: error.response?.data?.message || error.message };
  }
};

export const fetchExpiredLicensesByDateRangePdf = async (info) => {
  const token = getToken();
  try {
    const response = await axios.post(
      `${BASE_URL}/expired_licenses_report_pdf`,
      { info },
      {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      }
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "Licencias vencidas.pdf");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  } catch (error) {
    console.error("Error al exportar el PDF:", error);
  }
};

export const getInfractionsByType = async (year) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/infractions_report/by_type/${year}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching infractions by type:", error);
    return { error: error.response?.data?.message || error.message };
  }
};

export const getInfractionsByYear = async (year) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/infractions_report/by_year/${year}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching infractions by year:", error);
    return { error: error.response?.data?.message || error.message };
  }
};

export const fetchInfractionsByTypeAndYearPdf = async (info) => {
  const token = getToken();
  try {
    const response = await axios.post(
      `${BASE_URL}/infractions_report/by_type_and_year_pdf`,
      { info },
      {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      }
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "Infracciones por tipo.pdf");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  } catch (error) {
    console.error("Error al exportar el PDF:", error);
  }
};
