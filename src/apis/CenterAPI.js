import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const getCenter = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/center`);
    return response.data;
  } catch (error) {
    console.error("Error fetching center:", error);
    throw error;
  }
};

export const updateCenter = async (centerData) => {
  try {
    const response = await axios.put(`${BASE_URL}/center`, centerData);
    return response.data;
  } catch (error) {
    console.error("Error updating center:", error);
    throw error;
  }
};