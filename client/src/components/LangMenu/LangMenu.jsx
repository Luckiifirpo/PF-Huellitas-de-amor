import { Button, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setLanguage } from "../../redux/slices/languageSlice";

const LangMenu = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const lang = useSelector((state) => state.lang.currentLangData);
    const langName = useSelector((state) => state.lang.currentLang);
    const dispatch = useDispatch();

    const langNames = {
        "es" : "Español",
        "en" : "English",
        "pt" : "Português"
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const changeLanguage = (value) => {
        dispatch(setLanguage(value));
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {

    }, [lang]);

    return <React.Fragment>
        <Tooltip title="Language">
            <Button onClick={handleClick}>
                <Typography sx={{ minWidth: 100, color: "primary", fontSize:'15px' }}>{langNames[langName]}</Typography>
            </Button>
        </Tooltip>
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={(e) => { changeLanguage("es") }}>
                Español
            </MenuItem>
            <MenuItem onClick={(e) => { changeLanguage("en") }}>
                English
            </MenuItem>
            <MenuItem onClick={(e) => { changeLanguage("pt") }}>
                Português
            </MenuItem>
        </Menu>
    </React.Fragment>
}

export default LangMenu;