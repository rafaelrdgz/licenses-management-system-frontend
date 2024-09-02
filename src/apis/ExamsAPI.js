import axios from "axios";

const BASE_URL = "http://localhost:3000"; // Cambia el puerto si es diferente

export const getExams = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/exams`);
    return response.data;
  } catch (error) {
    console.error("Error fetching exams:", error);
    throw error;
  }
};

export const getExamById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/exams/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching exam by ID:", error);
    throw error;
  }
};

export const createExam = async (examData) => {
  try {
    const response = await axios.post(`${BASE_URL}/exams`, examData);
    return response.data;
  } catch (error) {
    console.error("Error creating exam:", error);
    throw error;
  }
};

export const updateExam = async (id, examData) => {
  try {
    const response = await axios.put(`${BASE_URL}/exams/${id}`, examData);
    return response.data;
  } catch (error) {
    console.error("Error updating exam:", error);
    throw error;
  }
};

export const deleteExam = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/exams/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting exam:", error);
    throw error;
  }
};

export const examsDone = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/exams/check/${id}`);
    return response.data.exists;
  } catch (error) {
    console.error("Error checking exams:", error);
    return error.response.data.exists;
  }
};