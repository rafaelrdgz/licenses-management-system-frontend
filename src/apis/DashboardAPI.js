import axios from "axios";

const BASE_URL = "http://localhost:3000"

export const getLicensesByType = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/dashboard/licenses/by_type`);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching infractions:", error);
    return {error: error.message};
  }
};

export const getTotalClients = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/dashboard/clients`);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    return {error: error.message};
  }
};

export const getTotalDrivers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/dashboard/drivers`);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching drivers:", error);
    return {error: error.message};
  }
};

export const getTotalLicenses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/dashboard/licenses`);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching licenses:", error);
    return {error: error.message};
  }
};

export const getTotalExams = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/dashboard/exams`);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching exams:", error);
    return {error: error.message};
  }
};

export const getPercent = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/dashboard/exams/passed_practical`);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching exams:", error);
    return {error: error.message};
  }
};

export const getLicensesAboutToExpire = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/dashboard/licenses/about_to_expire`);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching licenses:", error);
    return {error: error.message};
  }
};

export const getMedicalExams = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/dashboard/exams/medical`);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching medical exams:", error);
    return {error: error.message};
  }
}

export const getNoPaidInfractions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/dashboard/infractions/no_paid`);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching no paid infractions:", error);
    return {error: error.message};
  }
}