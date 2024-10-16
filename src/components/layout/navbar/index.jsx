import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ColorModeContext, tokens } from "../../../theme";
import { useContext } from "react";
import {
  DarkModeOutlined,
  LightModeOutlined,
  MenuOutlined,
} from "@mui/icons-material";
import { ToggledContext } from "../../../App";
import { Link } from "react-router-dom";
import { LogoutOutlined } from "@mui/icons-material";
import { AuthContext } from "../../../utils/AuthContext";
import React from "react";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const { toggled, setToggled } = useContext(ToggledContext);
  const isMdDevices = useMediaQuery("(max-width:768px)");
  const isXsDevices = useMediaQuery("(max-width:466px)");
  const colors = tokens(theme.palette.mode);

  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const setLanguageEn = () => {
    i18n.changeLanguage("en");
    console.log(i18n.language);
    handleClose();
  };

  const setLanguageEs = () => {
    i18n.changeLanguage("es");
    console.log(i18n.language);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={2}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <IconButton
          sx={{ display: `${isMdDevices ? "flex" : "none"}` }}
          onClick={() => setToggled(!toggled)}
        >
          <MenuOutlined />
        </IconButton>
      </Box>

      <Box>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <LightModeOutlined />
          ) : (
            <DarkModeOutlined />
          )}
        </IconButton>
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <LanguageOutlinedIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={setLanguageEs}>{t("navbar.languageES")}</MenuItem>
          <MenuItem onClick={setLanguageEn}>{t("navbar.languageEN")}</MenuItem>
        </Menu>
        <Link to="/login">
          <IconButton
            onClick={() => {
              logout();
              localStorage.removeItem("user");
            }}
          >
            <LogoutOutlined />
          </IconButton>
        </Link>
      </Box>
    </Box>
  );
};

export default Navbar;
