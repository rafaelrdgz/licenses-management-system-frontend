import axios from "axios";

const BASE_URL = "http://localhost:3000"; // Cambia el puerto si es diferente

export const getInfractions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/infractions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching infractions:", error);
    throw error;
  }
};

export const getInfractionById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/infractions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching infraction by ID:", error);
    throw error;
  }
};

export const createInfraction = async (infractionData) => {
  try {
    const response = await axios.post(`${BASE_URL}/infractions`, infractionData);
    return response.data;
  } catch (error) {
    console.error("Error creating infraction:", error);
    throw error;
  }
};

export const updateInfraction = async (id, infractionData) => {
  try {
    const response = await axios.put(`${BASE_URL}/infractions/${id}`, infractionData);
    return response.data;
  } catch (error) {
    console.error("Error updating infraction:", error);
    throw error;
  }
};

export const deleteInfraction = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/infractions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting infraction:", error);
    throw error;
  }
};
