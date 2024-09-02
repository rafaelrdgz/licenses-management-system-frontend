import dayjs from "dayjs";
import {checkId} from "../apis/ClientAPI.js";
import {checkIdDriver} from "../apis/DriversAPI.js";
import {examsDone} from "../apis/ExamsAPI.js";
import {checkEntity} from "../apis/EntityAPI.js";
import {checkLicense} from "../apis/LicensesAPI.js";

const isValidIdDate = (id) => {
  let y = id.substring(0, 2);
  let m = id.substring(2, 4);
  let d = id.substring(4, 6);

  if (dayjs(`${y}-${m}-${d}`, "YY-MM-DD", true).isValid()) {
    return true;
  }
  return false;
};

//hay q verificar en la bd si existe en la entidad y en tal caso retornar true
const isValidEntity = async (id) => {
  const response = await checkEntity(id);
  console.log(id);
  console.log(response);
  return response;
};

//hay q verificar en la bd si existe la persona y en tal caso retornar true
const isValidPersonID = async (id) => {
  const response = await checkId(id);
  console.log(id);
  console.log(response);
  return response;
};

const existsDriver = async (id) => {
  const response = await checkIdDriver(id);
  console.log(id);
  console.log(response);
  return !response;
};

//hay q verificar en la bd si la persona ya realizo los 3 examenes para obtener licencia y en tal caso retornar true
const checkExamsDone = async (id) => {
  const response = await examsDone(id);
  console.log(id);
  console.log(response);
  return response;
};

const isValidLicense = async (id) => {
  const response = await checkLicense(id);
  console.log(id);
  console.log(response);
  return response;
};

export {
  isValidIdDate,
  isValidEntity,
  isValidPersonID,
  existsDriver,
  checkExamsDone,
  isValidLicense
};
