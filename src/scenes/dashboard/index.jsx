import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Header, ProgressCircle, StatBox } from "../../components";
import { tokens } from "../../theme";
import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useState } from "react";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';


function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isXlDevices = useMediaQuery("(min-width: 1260px)");
  const isMdDevices = useMediaQuery("(min-width: 724px)");
  const isXsDevices = useMediaQuery("(max-width: 436px)");
  
  const [chartBarInfo, setChartBarInfo] = useState([]) // el array solo debe tener los 4 valores en el orden: Moto, Automóvil, Camión, Autobús
  const [progressCircleInfo, setProgressCircleInfo] = useState(0)//debe darse el valor en probabilidad de 0 a 1
  const [recentLicenses, setRecentLicenses] = useState([]) //debe ser un array de objetos con la siguiente estructura: [{id: "135132", name: "Rafael", date: "2021-10-10", category: "Automovil"}

  const loadData = () => {
    //cargar de la bd y asignar valores con setChartBarInfo , setProgressCircleInfo y setRecentLicenses
    setChartBarInfo([100, 200, 300, 400])
    setProgressCircleInfo(0.75)
    setRecentLicenses([ {id: "135132", name: "Rafael", date: "2021-10-10", category: "Automovil"}, {id: "135132", name: "Rafael", date: "2021-10-10", category: "Automovil"}])
  }

  useEffect(() => {
    loadData()
  }, [])
  
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
            title="11,361"
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
            title="431,225"
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
            title="32,441"
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
            title="1,325,134"
            subtitle="Infracciones"
            icon={
              <ArticleOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* Bar Chart */}
        <Box
          gridColumn={isXlDevices ? "span 4" : "span 3"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ p: "30px 30px 0 30px" }}
            color={"#d1d1d1"}
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
                  data: ["Moto", "Automóvil", "Camión", "Autobús"]
                },
              ]}
              series={[{ type: "bar", data: chartBarInfo}]}
              
            />
          </Box>
        </Box>

        <Box
          gridColumn={isXlDevices ? "span 4" : "span 3"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600" color={"#d1d1d1"}>
            Tasa de aprobación de exámen práctico
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" progress={progressCircleInfo}/>
            <Typography
              textAlign="center"
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
              fontWeight={'bold'}
            >
              {progressCircleInfo*100}%
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
              Licencias emitidas recientemente
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
                  {license.name}
                </Typography>
              </Box>
              <Typography color={colors.gray[100]}>
                {license.date}
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
      </Box>
    </Box>
  );
}

export default Dashboard;
