import axios from "axios";

const BASE_URL = "http://localhost:3000"; // Cambia el puerto si es diferente

export const getDrivers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/drivers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching drivers:", error);
    throw error;
  }
};

export const getDriverById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/drivers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching driver by ID:", error);
    throw error;
  }
};

export const updateDriver = async (id, driverData) => {
  try {
    const response = await axios.put(`${BASE_URL}/drivers/${id}`, driverData);
    return response.data;
  } catch (error) {
    console.error("Error updating driver:", error);
    throw error;
  }
};

export const deleteDriver = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/drivers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting driver:", error);
    throw error;
  }
};

export const checkIdDriver = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/drivers/exists/${id}`);
    console.log(response)
    return response.data.exists;
  } catch (error) {
    console.error("Error checking driver existence:", error);
    return error.response.data.exists;
  }
};