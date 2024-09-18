import axios from 'axios';

const BASE_URL = "http://localhost:3000"

export const getDriverReport = async (driverId) => {
  try {
    const response = await axios.get(`${BASE_URL}/driver_report/${driverId}`);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching report:", error);
    return {error: error.message};
  }
};

export const getLicensesByDateRange = async (startDate, endDate) => {
  console.log(startDate, endDate)
  try {
    const response = await axios.get(`${BASE_URL}/licenses_report`, {
      params: {startDate, endDate}
    });
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching licenses:", error);
    return {error: error.message};
  }
};

export const getExamsByDateRange = async (startDate, endDate) => {
  console.log(startDate, endDate)
  try {
    const response = await axios.get(`${BASE_URL}/exams_report`, {
      params: {startDate, endDate}
    });
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching exams:", error);
    return {error: error.message};
  }
};

export const getInfractionsByDateRange = async (startDate, endDate) => {
  console.log(startDate, endDate)
  try {
    const response = await axios.get(`${BASE_URL}/infractions_report`, {
      params: {startDate, endDate}
    });
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching infractions:", error);
    return {error: error.message};
  }
};

export const getExpiredLicensesByDateRange = async (startDate, endDate) => {
  console.log(startDate, endDate)
  try {
    const response = await axios.get(`${BASE_URL}/expired_licenses_report`, {
      params: {startDate, endDate}
    });
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching licenses:", error);
    return {error: error.message};
  }
}

export const getInfractionsByType = async (year) => {
  console.log(year)
  try {
    const response = await axios.get(`${BASE_URL}/infractions_report/by_type/${year}`);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching infractions:", error);
    return {error: error.message};
  }
};

export const getInfractionsByYear = async (year) => {
  console.log(year)
  try {
    const response = await axios.get(`${BASE_URL}/infractions_report/by_year/${year}`);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching infractions:", error);
    return {error: error.message};
  }
};