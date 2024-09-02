import axios from "axios";

const BASE_URL = "http://localhost:3000"; // Cambia el puerto si es diferente

export const getClients = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/clients`);
    return response.data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
};

export const getClientById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/clients/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching client by ID:", error);
    throw error;
  }
};

export const createClient = async (clientData) => {
  try {
    const response = await axios.post(`${BASE_URL}/clients`, clientData);
    return response.data;
  } catch (error) {
    console.error("Error creating client:", error);
    throw error;
  }
};

export const updateClient = async (id, clientData) => {
  try {
    const response = await axios.put(`${BASE_URL}/clients/${id}`, clientData);
    return response.data;
  } catch (error) {
    console.error("Error updating client:", error);
    throw error;
  }
};

export const deleteClient = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/clients/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting client:", error);
    throw error;
  }
};

export const checkId = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/clients/exists/${id}`);
    return response.data.exists;
  } catch (error) {
    console.error("Error checking person existence:", error);
    return error.response.data.exists;
  }
};