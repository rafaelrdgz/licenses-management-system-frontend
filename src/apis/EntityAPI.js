import axios from "axios";

const BASE_URL = "http://localhost:3000"; // Cambia el puerto si es diferente

export const getEntities = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/entities`);
    return response.data;
  } catch (error) {
    console.error("Error fetching entities:", error);
    throw error;
  }
};

export const getEntityById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/entities/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching entity by ID:", error);
    throw error;
  }
};

export const createEntity = async (entityData) => {
  try {
    const response = await axios.post(`${BASE_URL}/entities`, entityData);
    return response.data;
  } catch (error) {
    console.error("Error creating entity:", error);
    throw error;
  }
};

export const updateEntity = async (id, entityData) => {
  try {
    const response = await axios.put(`${BASE_URL}/entities/${id}`, entityData);
    return response.data;
  } catch (error) {
    console.error("Error updating entity:", error);
    throw error;
  }
};

export const deleteEntity = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/entities/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting entity:", error);
    throw error;
  }
};

export const checkEntity = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/entities/exists/${id}`);
    return response.data.exists;
  } catch (error) {
    console.error("Error checking entity existence:", error);
    return error.response.data.exists;
  }
};