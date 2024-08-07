import dayjs from "dayjs";

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
const isValidEntity = (id) =>{
  return true;
}

//hay q verificar en la bd si existe la persona y en tal caso retornar true
const isValidPersonID = (id) => {
  return true;
}

//hay q verificar en la bd si la persona ya realizo los 3 examenes para obtener licencia y en tal caso retornar true
const checkExamsDone = (id) => {
  return true;
}


export { isValidIdDate, isValidEntity, isValidPersonID, checkExamsDone };
