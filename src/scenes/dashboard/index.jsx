import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Header, ProgressCircle, StatBox } from "../../components";
import { tokens } from "../../theme";
import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useState } from "react";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import {
  getLicensesAboutToExpire,
  getLicensesByType,
  getMedicalExams,
  getNoPaidInfractions,
  getPercent,
  getTotalClients,
  getTotalDrivers,
  getTotalExams,
  getTotalLicenses,
} from "../../apis/DashboardAPI.js";

function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isXlDevices = useMediaQuery("(min-width: 1260px)");
  const isMdDevices = useMediaQuery("(min-width: 724px)");
  const isXsDevices = useMediaQuery("(max-width: 436px)");

  const [chartBarInfo, setChartBarInfo] = useState([[], []]); // el array solo debe tener los 4 valores en el orden: Moto, Automóvil, Camión, Autobús
  const [progressCircleInfo, setProgressCircleInfo] = useState(0); //debe darse el valor en probabilidad de 0 a 1
  const [recentLicenses, setRecentLicenses] = useState([]); //debe ser un array de objetos con la siguiente estructura: [{id: "135132", name: "Rafael", date: "2021-10-10", category: "Automovil"}
  const [clients, setClients] = useState(0);
  const [drivers, setDrivers] = useState(0);
  const [licenses, setLicenses] = useState(0);
  const [exams, setExams] = useState(0);
  const [medicalExams, setMedicalExams] = useState([]);
  const [noPaidInfractions, setNoPaidInfractions] = useState([]);

  const loadData = async () => {
    const licenseTypes = await getLicensesByType();

    setChartBarInfo(licenseTypes);

    const c = await getTotalClients();
    setClients(c);

    const d = await getTotalDrivers();
    setDrivers(d);

    const l = await getTotalLicenses();
    setLicenses(l);

    const e = await getTotalExams();
    setExams(e);

    const p = await getPercent();
    setProgressCircleInfo(parseFloat(p));

    const response = await getLicensesAboutToExpire();
    setRecentLicenses(response);

    const m = await getMedicalExams();
    setMedicalExams(m);

    const i = await getNoPaidInfractions();
    setNoPaidInfractions(i);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        <Header title="PRINCIPAL" subtitle="Resúmen estadístico del centro" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns={
          isXlDevices
            ? "repeat(12, 1fr)"
            : isMdDevices
            ? "repeat(6, 1fr)"
            : "repeat(3, 1fr)"
        }
        gridAutoRows="140px"
        gap="20px"
      >
        {/* Statistic Items */}
        <Box
          gridColumn="span 3"
          bgcolor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="5px"
        >
          <StatBox
            title={clients}
            subtitle="Clientes registrados"
            icon={
              <PermIdentityOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="5px"
        >
          <StatBox
            title={drivers}
            subtitle="Conductores con licencia vigente"
            icon={
              <DirectionsCarFilledOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="5px"
        >
          <StatBox
            title={licenses}
            subtitle="Licencias emitidas"
            icon={
              <BadgeOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="5px"
        >
          <StatBox
            title={exams}
            subtitle="Exámenes realizados"
            icon={
              <ArticleOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* Bar Chart */}
        <Box
          gridColumn={isXlDevices ? "span 6" : "span 3"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ p: "30px 30px 0 30px" }}
            color={colors.gray[100]}
          >
            Licencias por categoría
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="250px"
            mt="-20px"
          >
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: chartBarInfo[0],
                },
              ]}
              series={[{ type: "bar", data: chartBarInfo[1] }]}
            />
          </Box>
        </Box>

        <Box
          gridColumn={isXlDevices ? "span 6" : "span 3"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600" color={colors.gray[100]}>
            Tasa de aprobación de exámen práctico
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" progress={progressCircleInfo} />
            <Typography
              textAlign="center"
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
              fontWeight={"bold"}
            >
              {(parseFloat(progressCircleInfo) * 100).toFixed(2)}%
            </Typography>
          </Box>
        </Box>

        <Box
          gridColumn={isXlDevices ? "span 4" : "span 3"}
          gridRow="span 2"
          bgcolor={colors.primary[400]}
          overflow="auto"
        >
          <Box borderBottom={`4px solid ${colors.primary[500]}`} p="15px">
            <Typography color={colors.gray[100]} variant="h5" fontWeight="600">
              Licencias próximas a vencer
            </Typography>
          </Box>
          {recentLicenses.map((license, index) => (
            <Box
              key={`${license.id}-${index}`}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {license.id}
                </Typography>
                <Typography color={colors.gray[100]}>
                  {license.driverId}
                </Typography>
              </Box>
              <Typography color={colors.gray[100]}>
                {license.expirationDate.substring(0, 10)}
              </Typography>
              <Box
                bgcolor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                {license.category}
              </Box>
            </Box>
          ))}
        </Box>
        <Box
          gridColumn={isXlDevices ? "span 4" : "span 3"}
          gridRow="span 2"
          bgcolor={colors.primary[400]}
          overflow="auto"
        >
          <Box borderBottom={`4px solid ${colors.primary[500]}`} p="15px">
            <Typography color={colors.gray[100]} variant="h5" fontWeight="600">
              Exámenes médicos periódicos
            </Typography>
          </Box>
          {medicalExams.map((driver, index) => (
            <Box
              key={`${driver.id}-${index}`}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {driver.id}
                </Typography>
                <Typography color={colors.gray[100]}>
                  {driver.name} {driver.lastnames}
                </Typography>
              </Box>
              <Typography color={colors.gray[100]}>
                {driver.phonenumber}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box
          gridColumn={isXlDevices ? "span 4" : "span 3"}
          gridRow="span 2"
          bgcolor={colors.primary[400]}
          overflow="auto"
        >
          <Box borderBottom={`4px solid ${colors.primary[500]}`} p="15px">
            <Typography color={colors.gray[100]} variant="h5" fontWeight="600">
              Multas pendientes de pago
            </Typography>
          </Box>
          {noPaidInfractions.map((infraction, index) => (
            <Box
              key={`${infraction.id}-${index}`}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {infraction.id}
                </Typography>
                <Typography color={colors.gray[100]}>
                  {infraction.name}
                </Typography>
              </Box>
              <Typography color={colors.gray[100]}>
                {infraction.date.substring(0, 10)}
              </Typography>
              <Box
                bgcolor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                {infraction.type}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
