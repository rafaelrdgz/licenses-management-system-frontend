import { Box } from "@mui/material";
import { Header, AccordionItem } from "../../components";
import { mockAccordionData } from "../../data/mockData";

const Notifications = () => {
  return (
    <Box m="20px">
      <Header title="NOTIFICACIONES" subtitle="Alertas y notificaciones" />
      {mockAccordionData.map((accordion, index) => (
        <AccordionItem key={index} {...accordion} />
      ))}
    </Box>
  );
};

export default Notifications;
