import axios from "axios";
import { getToken } from "../utils/AuthContext";

const BASE_URL = "http://localhost:3000"; // Cambia el puerto si es diferente

// Funciones con token JWT en el encabezado

export const getInfractions = async () => {
  const token = getToken();
  try {
    const response = await axios.get(`${BASE_URL}/infractions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching infractions:", error);
    throw error;
  }
};

export const getInfractionById = async (id) => {
  const token = getToken();
  try {
    const response = await axios.get(`${BASE_URL}/infractions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching infraction by ID:", error);
    throw error;
  }
};

export const createInfraction = async (infractionData) => {
  const token = getToken();
  try {
    const response = await axios.post(`${BASE_URL}/infractions`, infractionData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating infraction:", error);
    throw error;
  }
};

export const updateInfraction = async (id, infractionData) => {
  const token = getToken();
  try {
    const response = await axios.put(`${BASE_URL}/infractions/${id}`, infractionData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating infraction:", error);
    throw error;
  }
};

export const deleteInfraction = async (id) => {
  const token = getToken();
  try {
    const response = await axios.delete(`${BASE_URL}/infractions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting infraction:", error);
    throw error;
  }
};
