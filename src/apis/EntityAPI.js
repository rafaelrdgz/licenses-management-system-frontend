import axios from "axios";
import { getToken } from "../utils/AuthContext";

const BASE_URL = "http://localhost:3000"; // Cambia el puerto si es diferente

// Funciones con token JWT en el encabezado

export const getEntities = async () => {
  const token = getToken();
  try {
    const response = await axios.get(`${BASE_URL}/entities`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching entities:", error);
    throw error;
  }
};

export const getEntityById = async (id) => {
  const token = getToken();
  try {
    const response = await axios.get(`${BASE_URL}/entities/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching entity by ID:", error);
    throw error;
  }
};

export const createEntity = async (entityData) => {
  const token = getToken();
  try {
    const response = await axios.post(`${BASE_URL}/entities`, entityData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating entity:", error);
    throw error;
  }
};

export const updateEntity = async (id, entityData) => {
  const token = getToken();
  try {
    const response = await axios.put(`${BASE_URL}/entities/${id}`, entityData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating entity:", error);
    throw error;
  }
};

export const deleteEntity = async (id) => {
  const token = getToken();
  try {
    const response = await axios.delete(`${BASE_URL}/entities/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting entity:", error);
    throw error;
  }
};

export const checkEntity = async (id) => {
  const token = getToken();
  try {
    const response = await axios.get(`${BASE_URL}/entities/exists/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.exists;
  } catch (error) {
    console.error("Error checking entity existence:", error);
    return error.response.data.exists;
  }
};

export const fetchEntityPdf = async (info) => {
  const token = getToken();
  try {
    const response = await axios.post(
      `${BASE_URL}/entities/pdf`,
      { info },
      {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      }
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "Ficha_de_Entidad.pdf");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  } catch (error) {
    console.error("Error al exportar el PDF:", error);
  }
};
