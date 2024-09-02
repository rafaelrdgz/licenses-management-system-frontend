/* eslint-disable react/prop-types */
import {Box, Typography, useTheme} from "@mui/material";
import {tokens} from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({title, subtitle, icon, progress, increase, disablePercent = true}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box width="100%" mx="30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography variant="h4" fontWeight="bold" color={colors.gray[100]}>
            {title}
          </Typography>
        </Box>
        {!disablePercent && (<Box>
          <ProgressCircle progress={progress}/>
        </Box>)}
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" color={colors.greenAccent[500]}>
          {subtitle}
        </Typography>
        {!disablePercent && (<Typography
          variant="h5"
          fontStyle="italic"
          color={colors.greenAccent[600]}
        >
          {progress * 100}%
        </Typography>)}
      </Box>
    </Box>
  );
};

export default StatBox;
