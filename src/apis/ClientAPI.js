import axios from "axios";
import { getToken } from "../utils/AuthContext";

const BASE_URL = "http://localhost:3000"; // Cambia el puerto si es diferente

export const getClients = async () => {
  const token = getToken(); // Obtener el token

  try {
    const response = await axios.get(`${BASE_URL}/clients`, {
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token en la solicitud
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
};

export const getClientById = async (id) => {
  const token = getToken();

  try {
    const response = await axios.get(`${BASE_URL}/clients/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token en la solicitud
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching client by ID:", error);
    throw error;
  }
};

export const createClient = async (clientData) => {
  const token = getToken();

  try {
    const response = await axios.post(`${BASE_URL}/clients`, clientData, {
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token en la solicitud
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating client:", error);
    throw error;
  }
};

export const updateClient = async (id, clientData) => {
  const token = getToken();

  try {
    const response = await axios.put(`${BASE_URL}/clients/${id}`, clientData, {
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token en la solicitud
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating client:", error);
    throw error;
  }
};

export const deleteClient = async (id) => {
  const token = getToken();

  try {
    const response = await axios.delete(`${BASE_URL}/clients/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token en la solicitud
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting client:", error);
    throw error;
  }
};

export const checkId = async (id) => {
  const token = getToken();

  try {
    const response = await axios.get(`${BASE_URL}/clients/exists/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token en la solicitud
      },
    });
    return response.data.exists;
  } catch (error) {
    console.error("Error checking person existence:", error);
    return error.response.data.exists;
  }
};
