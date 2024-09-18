import axios from "axios";

const BASE_URL = "http://localhost:3000"; // Cambia el puerto si es diferente

export const getWorkers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/workers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching workers:", error);
    throw error;
  }
};

export const getWorkerById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/workers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching worker by ID:", error);
    throw error;
  }
};

export const createWorker = async (workerData) => {
  try {
    const response = await axios.post(`${BASE_URL}/workers`, workerData);
    return response.data;
  } catch (error) {
    console.error("Error creating worker:", error);
    throw error;
  }
};

export const updateWorker = async (id, workerData) => {
  try {
    const response = await axios.put(`${BASE_URL}/workers/${id}`, workerData);
    return response.data;
  } catch (error) {
    console.error("Error updating worker:", error);
    throw error;
  }
};

export const deleteWorker = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/workers/${id}`);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error deleting worker:", error);
    throw error;
  }
};

/*export const loginWorker = async (email, password) => {
  try {
    const response = await axios.get(`${BASE_URL}/login`, {
      params: {email: email, password: password}
    });
    return response;
  } catch (error) {
    console.error("Error fetching worker:", error);
    throw error;
  }
};*/

export const loginWorker = async (email, password)=>{
  if(email === 'manager@licencias.com' && password === 'manager'){
    return {status: 200, data: {email: email, password: password, role: 'MANAGER'}}
  }else if(email === 'comercial@licencias.com' && password === 'comercial'){
    return {status: 200, data: {email: email, password: password, role: 'COMERCIAL'}}
  }
}