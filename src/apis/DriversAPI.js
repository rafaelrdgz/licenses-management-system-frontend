import axios from "axios";
import { getToken } from "../utils/AuthContext";

const BASE_URL = "http://localhost:3000"; // Cambia el puerto si es diferente

// Funciones con token JWT en el encabezado

export const getDrivers = async () => {
  const token = getToken();
  try {
    const response = await axios.get(`${BASE_URL}/drivers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching drivers:", error);
    throw error;
  }
};

export const getDriverById = async (id) => {
  const token = getToken();
  try {
    const response = await axios.get(`${BASE_URL}/drivers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching driver by ID:", error);
    throw error;
  }
};

export const updateDriver = async (id, driverData) => {
  const token = getToken();
  try {
    const response = await axios.put(`${BASE_URL}/drivers/${id}`, driverData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating driver:", error);
    throw error;
  }
};

export const deleteDriver = async (id) => {
  const token = getToken();
  try {
    const response = await axios.delete(`${BASE_URL}/drivers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting driver:", error);
    throw error;
  }
};

export const checkIdDriver = async (id) => {
  const token = getToken();
  try {
    const response = await axios.get(`${BASE_URL}/drivers/exists/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data.exists;
  } catch (error) {
    console.error("Error checking driver existence:", error);
    return error.response.data.exists;
  }
};
