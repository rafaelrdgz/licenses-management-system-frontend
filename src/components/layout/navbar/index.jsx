import {Box, IconButton, useMediaQuery, useTheme,} from "@mui/material";
import {ColorModeContext, tokens} from "../../../theme";
import {useContext} from "react";
import {
  DarkModeOutlined,
  DashboardOutlined,
  LightModeOutlined,
  MenuOutlined,
  NotificationsOutlined,
} from "@mui/icons-material";
import {ToggledContext} from "../../../App";
import {Link} from "react-router-dom";
import { LogoutOutlined } from "@mui/icons-material";
import { AuthContext } from "../../../utils/AuthContext";


const Navbar = () => {
  const {logout} = useContext(AuthContext);
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const {toggled, setToggled} = useContext(ToggledContext);
  const isMdDevices = useMediaQuery("(max-width:768px)");
  const isXsDevices = useMediaQuery("(max-width:466px)");
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={2}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <IconButton
          sx={{display: `${isMdDevices ? "flex" : "none"}`}}
          onClick={() => setToggled(!toggled)}
        >
          <MenuOutlined/>
        </IconButton>
      </Box>

      <Box>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <LightModeOutlined/>
          ) : (
            <DarkModeOutlined/>
          )}
        </IconButton>
        {/*<Link to="/notifications">
          <IconButton>
            <NotificationsOutlined/>
          </IconButton>
        </Link>*/}
        <Link to="/login">
          <IconButton onClick={() =>{
            logout();
            localStorage.removeItem('user');
          }}>
            <LogoutOutlined />
          </IconButton>
        </Link>
      </Box>
    </Box>
  );
};

export default Navbar;
