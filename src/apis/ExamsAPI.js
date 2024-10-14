import axios from "axios";
import { getToken } from "../utils/AuthContext";

const BASE_URL = "http://localhost:3000"; // Cambia el puerto si es diferente

// Funciones con token JWT en el encabezado

export const getExams = async () => {
  const token = getToken();
  try {
    const response = await axios.get(`${BASE_URL}/exams`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching exams:", error);
    throw error;
  }
};

export const getExamById = async (id) => {
  const token = getToken();
  try {
    const response = await axios.get(`${BASE_URL}/exams/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching exam by ID:", error);
    throw error;
  }
};

export const createExam = async (examData) => {
  const token = getToken();
  try {
    const response = await axios.post(`${BASE_URL}/exams`, examData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating exam:", error);
    throw error;
  }
};

export const updateExam = async (id, examData) => {
  const token = getToken();
  try {
    const response = await axios.put(`${BASE_URL}/exams/${id}`, examData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating exam:", error);
    throw error;
  }
};

export const deleteExam = async (id) => {
  const token = getToken();
  try {
    const response = await axios.delete(`${BASE_URL}/exams/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting exam:", error);
    throw error;
  }
};

export const examsDone = async (id) => {
  const token = getToken();
  try {
    const response = await axios.get(`${BASE_URL}/exams/check/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.exists;
  } catch (error) {
    console.error("Error checking exams:", error);
    return error.response.data.exists;
  }
};
