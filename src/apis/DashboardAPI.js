import axios from "axios";
import { getToken } from "../utils/AuthContext";

const BASE_URL = "http://localhost:3000";

// Funciones con token JWT en el encabezado

export const getLicensesByType = async () => {
  const token = getToken();
  try {
    const response = await axios.get(`${BASE_URL}/dashboard/licenses/by_type`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching licenses by type:", error);
    return { error: error.message };
  }
};

export const getTotalClients = async () => {
  const token = getToken();
  try {
    const response = await axios.get(`${BASE_URL}/dashboard/clients`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching total clients:", error);
    return { error: error.message };
  }
};

export const getTotalDrivers = async () => {
  const token = getToken();
  try {
    const response = await axios.get(`${BASE_URL}/dashboard/drivers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching total drivers:", error);
    return { error: error.message };
  }
};

export const getTotalLicenses = async () => {
  const token = getToken();
  try {
    const response = await axios.get(`${BASE_URL}/dashboard/licenses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching total licenses:", error);
    return { error: error.message };
  }
};

export const getTotalExams = async () => {
  const token = getToken();
  try {
    const response = await axios.get(`${BASE_URL}/dashboard/exams`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching total exams:", error);
    return { error: error.message };
  }
};

export const getPercent = async () => {
  const token = getToken();
  try {
    const response = await axios.get(`${BASE_URL}/dashboard/exams/passed_practical`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching passed practical percent:", error);
    return { error: error.message };
  }
};

export const getLicensesAboutToExpire = async () => {
  const token = getToken();
  try {
    const response = await axios.get(`${BASE_URL}/dashboard/licenses/about_to_expire`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching licenses about to expire:", error);
    return { error: error.message };
  }
};

export const getMedicalExams = async () => {
  const token = getToken();
  try {
    const response = await axios.get(`${BASE_URL}/dashboard/exams/medical`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching medical exams:", error);
    return { error: error.message };
  }
};

export const getNoPaidInfractions = async () => {
  const token = getToken();
  try {
    const response = await axios.get(`${BASE_URL}/dashboard/infractions/no_paid`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching no paid infractions:", error);
    return { error: error.message };
  }
};
