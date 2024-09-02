import {Box} from "@mui/material";
import {AccordionItem, Header} from "../../components";
import {useEffect, useState} from "react";


const Notifications = () => {
  const [notifications, setNotifications] = useState([{
    title: "Notificación de alerta",//esta es la estructura q debe tener cada notificacion
    content: "Este es un mensaje de alerta para el usuario",
  }])

  const loadNotifications = async () => {

  }

  useEffect(() => {
    loadNotifications
  }, [])

  return (
    <Box m="20px">
      <Header title="NOTIFICACIONES" subtitle="Alertas y notificaciones"/>
      {notifications.map((accordion, index) => (
        <AccordionItem key={index} {...accordion} />
      ))}
    </Box>
  );
};

export default Notifications;
