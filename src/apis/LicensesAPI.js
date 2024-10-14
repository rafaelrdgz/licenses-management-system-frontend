import axios from "axios";
import { getToken } from "../utils/AuthContext";

const BASE_URL = "http://localhost:3000"; // Cambia el puerto si es diferente

export const getLicenses = async () => {
  const token = getToken();
  try {
    const response = await axios.get(`${BASE_URL}/licenses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching licenses:", error);
    throw error;
  }
};

export const getLicenseById = async (id) => {
  const token = getToken();
  try {
    const response = await axios.get(`${BASE_URL}/licenses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching license by ID:", error);
    throw error;
  }
};

export const createLicense = async (licenseData) => {
  const token = getToken();
  try {
    const response = await axios.post(`${BASE_URL}/licenses`, licenseData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating license:", error);
    throw error;
  }
};

export const updateLicense = async (id, licenseData) => {
  const token = getToken();
  try {
    const response = await axios.put(`${BASE_URL}/licenses/${id}`, licenseData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating license:", error);
    throw error;
  }
};

export const updateLicenseWithCategory = async (id, licenseData) => {
  const token = getToken();
  try {
    const response = await axios.put(`${BASE_URL}/licenses/${id}/add_category`, licenseData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating license with category:", error);
    throw error;
  }
};

export const deleteLicense = async (id) => {
  const token = getToken();
  try {
    const response = await axios.delete(`${BASE_URL}/licenses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting license:", error);
    throw error;
  }
};

export const checkLicense = async (id) => {
  const token = getToken();
  try {
    const response = await axios.get(`${BASE_URL}/licenses/exists/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.exists;
  } catch (error) {
    console.error("Error checking license existence:", error);
    return error.response.data.exists;
  }
};

export const getMissingCategories = async (id) => {
  const token = getToken();
  try {
    const response = await axios.get(`${BASE_URL}/licenses/${id}/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching missing categories:", error);
    return null;
  }
};
