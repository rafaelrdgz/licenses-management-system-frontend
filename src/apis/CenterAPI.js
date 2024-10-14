import axios from "axios";
import { getToken } from "../utils/AuthContext";

const BASE_URL = "http://localhost:3000";

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
