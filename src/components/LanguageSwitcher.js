import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LanguageIcon from '@mui/icons-material/Language';

function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [anchorEl, setAnchorEl] = useState(null);
    const [languages, setLanguages] = useState([]);

    const open = Boolean(anchorEl);

    // Fetch available languages
    useEffect(() => {
        fetch('https://hikiju.de/languages')
            .then((response) => response.json())
            .then((data) => setLanguages(data))
            .catch((error) => console.error('Error fetching languages:', error));
    }, []);

    // Handle opening the menu
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Handle closing the menu
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Handle changing the language
    const handleLanguageChange = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('i18nLanguage', lang);
        handleClose();
    };

    return (
        <>
            <IconButton
                color="inherit"
                aria-label="Change Language"
                onClick={handleClick}
            >
                <LanguageIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {languages.map((language) => (
                    <MenuItem
                        key={language.id}
                        onClick={() => handleLanguageChange(language.lang)}
                    >
                        {language.lang.toUpperCase()}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}

export default LanguageSwitcher;
