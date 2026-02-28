import axios from "axios";
import { getToken } from "../utils/AuthContext";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getCenter = async () => {
  const token = getToken(); // Obtener el token

  try {
    const response = await axios.get(`${BASE_URL}/center`, {
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token en la solicitud
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching center:", error);
    throw error;
  }
};

export const updateCenter = async (centerData) => {
  const token = getToken(); // Obtener el token

  try {
    const response = await axios.put(`${BASE_URL}/center`, centerData, {
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token en la solicitud
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating center:", error);
    throw error;
  }
};

export const fetchCenterPdf = async (info) => {
  const token = getToken();
  try {
    const response = await axios.post(
      `${BASE_URL}/center/pdf`,
      { info },
      {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      }
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "Ficha_de_Centro.pdf");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  } catch (error) {
    console.error("Error al exportar el PDF:", error);
  }
};
