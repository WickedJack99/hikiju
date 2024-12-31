import { AppBar, Drawer, IconButton, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Toolbar } from "@mui/material";
import { Menu as MenuIcon, DarkMode as DarkModeIcon, Home as HomeIcon, Directions as DirectionsIcon, Search as SearchIcon, CorporateFare as CorporateFareIcon, Emergency as EmergencyIcon } from "@mui/icons-material";
import "../styles/Navbar.css";
import { useColorScheme } from '@mui/material/styles';
import React, { useState } from "react";

import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import LanguageSwitcher from "./LanguageSwitcher";

function Navbar() {
    const { t } = useTranslation();
    const language = i18n.language;

    function getTranslation(key) {
        return t(language + '.' + key + '.translation');
    }

    const { mode, setMode } = useColorScheme();

    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const drawerItems = [
        { href: "/", icon: <HomeIcon />, textKey: "nav_home" },
        { href: "/directions", icon: <DirectionsIcon />, textKey: "nav_directions" },
        { href: "/assistance", icon: <CorporateFareIcon />, textKey: "nav_assistance" },
        { href: "/search", icon: <SearchIcon />, textKey: "nav_search" }
    ]
    const emergencyItem = {
        href: "tel:110",
        icon: <EmergencyIcon />,
        textKey: "nav_emergency",
    };

    const DrawerContent = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {drawerItems.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemButton href={item.href}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={getTranslation(item.textKey)} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                <ListItem>
                    <ListItemButton href={emergencyItem.href}>
                        <ListItemIcon>{emergencyItem.icon}</ListItemIcon>
                        <ListItemText primary={getTranslation(emergencyItem.textKey)} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <>
        <AppBar position="sticky">
            <Toolbar>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="Menu"
                onClick={
                    toggleDrawer(true)
                }
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                open={open}
                onClose={toggleDrawer(false)}
            >
                {DrawerContent}
            </Drawer>

            <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
                <IconButton
                color="inherit"
                aria-label="Toggle Dark Mode"
                onClick={() => {
                    setMode(mode === "dark" ? "light" : "dark");
                }}
                >
                <DarkModeIcon />
                </IconButton>

                <LanguageSwitcher/>
            </Box>
            </Toolbar>
        </AppBar>
        </>
    );
};

export default Navbar;
