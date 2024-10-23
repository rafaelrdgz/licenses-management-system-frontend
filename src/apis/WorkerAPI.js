import axios from "axios";
import { getToken } from "../utils/AuthContext";

const BASE_URL = "http://localhost:3000"; // Cambia el puerto si es diferente

export const getWorkers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/workers`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching workers:", error);
    throw error.response?.data?.message || error.message;
  }
};

export const getWorkerById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/workers/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching worker by ID:", error);
    throw error.response?.data?.message || error.message;
  }
};

export const createWorker = async (workerData) => {
  try {
    const response = await axios.post(`${BASE_URL}/workers`, workerData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating worker:", error);
    throw error.response?.data?.message || error.message;
  }
};

export const updateWorker = async (id, workerData) => {
  try {
    const response = await axios.put(`${BASE_URL}/workers/${id}`, workerData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating worker:", error);
    throw error.response?.data?.message || error.message;
  }
};

export const deleteWorker = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/workers/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting worker:", error);
    throw error.response?.data?.message || error.message;
  }
};

export const loginWorker = async (email, password) => {
  try {
    const response = await axios.get(`${BASE_URL}/login`, {
      params: { email, password },
    });
    return response; // Retorna solo los datos de respuesta
  } catch (error) {
    console.error("Error logging in worker:", error);
    throw error.response?.data?.message || error.message;
  }
};

export const checkWorkerId = async (id) => {
  const token = getToken();

  try {
    const response = await axios.get(`${BASE_URL}/workers/exists/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token en la solicitud
      },
    });
    return response.data.exists;
  } catch (error) {
    console.error("Error checking worker existence:", error);
    return error.response.data.exists;
  }
};
