import axios from "axios";

const BASE_URL = "http://localhost:3000"; // Cambia el puerto si es diferente

export const getLicenses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/licenses`);
    return response.data;
  } catch (error) {
    console.error("Error fetching licenses:", error);
    throw error;
  }
};

export const getLicenseById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/licenses/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching license by ID:", error);
    throw error;
  }
};

export const createLicense = async (licenseData) => {
  try {
    const response = await axios.post(`${BASE_URL}/licenses`, licenseData);
    return response.data;
  } catch (error) {
    console.error("Error creating license:", error);
    throw error;
  }
};

export const updateLicense = async (id, licenseData) => {
  try {
    const response = await axios.put(`${BASE_URL}/licenses/${id}`, licenseData);
    return response.data;
  } catch (error) {
    console.error("Error updating license:", error);
    throw error;
  }
};

export const updateLicenseWithCategory = async (id, licenseData) => {
  try {
    const response = await axios.put(`${BASE_URL}/licenses/${id}/add_category`, licenseData);
    return response.data;
  } catch (error) {
    console.error("Error updating license:", error);
    throw error;
  }
};

export const deleteLicense = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/licenses/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting license:", error);
    throw error;
  }
};

export const checkLicense = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/licenses/exists/${id}`);
    return response.data.exists;
  } catch (error) {
    console.error("Error checking license existence:", error);
    return error.response.data.exists;
  }
};

export const getMissingCategories = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/licenses/${id}/categories`);
    return response.data;
  } catch (error) {
    console.error("Error checking license existence:", error);
    return null;
  }
};