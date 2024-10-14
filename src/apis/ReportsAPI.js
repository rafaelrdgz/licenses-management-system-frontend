import axios from 'axios';
import { getToken } from '../utils/AuthContext';

const BASE_URL = "http://localhost:3000"; // Cambia el puerto si es diferente

export const getDriverReport = async (driverId) => {
  try {
    const response = await axios.get(`${BASE_URL}/driver_report/${driverId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching report:", error);
    return { error: error.response?.data?.message || error.message };
  }
};

export const getLicensesByDateRange = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${BASE_URL}/licenses_report`, {
      params: { startDate, endDate },
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching licenses:", error);
    return { error: error.response?.data?.message || error.message };
  }
};

export const getExamsByDateRange = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${BASE_URL}/exams_report`, {
      params: { startDate, endDate },
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching exams:", error);
    return { error: error.response?.data?.message || error.message };
  }
};

export const getInfractionsByDateRange = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${BASE_URL}/infractions_report`, {
      params: { startDate, endDate },
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching infractions:", error);
    return { error: error.response?.data?.message || error.message };
  }
};

export const getExpiredLicensesByDateRange = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${BASE_URL}/expired_licenses_report`, {
      params: { startDate, endDate },
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching expired licenses:", error);
    return { error: error.response?.data?.message || error.message };
  }
};

export const getInfractionsByType = async (year) => {
  try {
    const response = await axios.get(`${BASE_URL}/infractions_report/by_type/${year}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching infractions by type:", error);
    return { error: error.response?.data?.message || error.message };
  }
};

export const getInfractionsByYear = async (year) => {
  try {
    const response = await axios.get(`${BASE_URL}/infractions_report/by_year/${year}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching infractions by year:", error);
    return { error: error.response?.data?.message || error.message };
  }
};
