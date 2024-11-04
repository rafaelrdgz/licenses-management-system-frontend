/* eslint-disable react/prop-types */
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { tokens } from "../../../theme";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { DashboardOutlined, MenuOutlined, PeopleAltOutlined, StoreOutlined } from "@mui/icons-material";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import logoo from "../../../assets/images/logo.png";
import Item from "./Item";
import { ToggledContext } from "../../../App";
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import { EngineeringOutlined } from "@mui/icons-material";
import { AuthContext } from "../../../utils/AuthContext";
import { useTranslation } from "react-i18next";

const SideBar = () => {
  const { user } = useContext(AuthContext);

  const [collapsed, setCollapsed] = useState(false);
  const { toggled, setToggled } = useContext(ToggledContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [logo, setLogo] = useState(logoo);

  const { t } = useTranslation();

  return (
    <Sidebar
      backgroundColor={ colors.primary[400] }
      rootStyles={ {
        border: 0,
        height: "100%",
      } }
      collapsed={ collapsed }
      onBackdropClick={ () => setToggled(false) }
      toggled={ toggled }
      breakPoint="md"
    >
      <Menu
        menuItemStyles={ {
          button: { ":hover": { background: "transparent" } },
        } }
      >
        <MenuItem
          rootStyles={ {
            margin: "10px 0 20px 0",
            color: colors.gray[100],
          } }
        >
          <Box
            sx={ {
              display: "flex",
              alignItems: "center",
              justifyContent: 'space-between',
            } }
          >
            { !collapsed && (
              <Box
                display="flex"
                alignItems="center"
                gap="12px"
                sx={ { transition: ".3s ease" } }
              >
                {/*<img
                  style={{width: "30px", height: "30px", borderRadius: "8px", marginLeft: "15px"}}
                  src={logo}
                  alt="Argon"
            />*/}
              </Box>
            ) }
            <IconButton onClick={ () => setCollapsed(!collapsed) }>
              <MenuOutlined />
            </IconButton>
          </Box>
        </MenuItem>
      </Menu>
      <Box mb={ 5 } pl={ collapsed ? undefined : "5%" }>
        <Menu
          menuItemStyles={ {
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          } }
        >
          <Item
            title={ t("sidebar.dashboard") }
            path="/dashboard"
            colors={ colors }
            icon={ <DashboardOutlined /> }
          />
          <Item
            title={ t("sidebar.reports") }
            path="/reports"
            colors={ colors }
            icon={ <SummarizeOutlinedIcon /> }
          />
        </Menu>
        <Typography
          variant="h6"
          color={ colors.gray[300] }
          sx={ { m: "15px 0 5px 20px" } }
        >
          { !collapsed ? t("sidebar.data") : " " }
        </Typography>
        <Menu
          menuItemStyles={ {
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          } }
        >
          { user && user.role === 'MANAGER' && (<Item
            title={ t("sidebar.entities") }
            path="/entity"
            colors={ colors }
            icon={ <PeopleAltOutlined /> }
          />) }
          <Item
            title={ t("sidebar.clients") }
            path="/clients"
            colors={ colors }
            icon={ <PermIdentityOutlinedIcon /> }
          />
          <Item
            title={ t("sidebar.drivers") }
            path="/drivers"
            colors={ colors }
            icon={ <DirectionsCarFilledOutlinedIcon /> }
          />
          <Item
            title={ t("sidebar.licenses") }
            path="/licenses"
            colors={ colors }
            icon={ <BadgeOutlinedIcon /> }
          />
          <Item
            title={ t("sidebar.exams") }
            path="/exams"
            colors={ colors }
            icon={ <ArticleOutlinedIcon /> }
          />
          <Item
            title={ t("sidebar.infractions") }
            path="/infractions"
            colors={ colors }
            icon={ <PaidOutlinedIcon /> }
          />
        </Menu>
        { user && user.role === 'MANAGER' && (<><Typography
          variant="h6"
          color={ colors.gray[300] }
          sx={ { m: "15px 0 5px 20px" } }
        >
          { !collapsed ? t("sidebar.center") : " " }
        </Typography><Menu
          menuItemStyles={ {
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          } }
        >
            <Item
              title={ t("sidebar.workers") }
              path="/workers"
              colors={ colors }
              icon={ <EngineeringOutlined /> }
            ></Item>
            <Item
              title={ t("sidebar.profile") }
              path="/center"
              colors={ colors }
              icon={ <StoreOutlined /> }
            ></Item>
          </Menu></>) }
      </Box>
    </Sidebar>
  );
};

export default SideBar;
