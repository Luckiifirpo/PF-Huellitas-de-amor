import { Avatar, Box, Button, Divider, Grid, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography, } from "@mui/material";
import PersonAdd from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import Logout from '@mui/icons-material/Logout';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/slices/userSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getFavorites } from "../../redux/slices/adoptionSlice";

const UserAccountMenu = (props) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const lang = useSelector((state) => state.lang.currentLangData);
    const dispatch = useDispatch();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const HandleSignOut = () => {
        dispatch(signOut()) 
        localStorage.setItem('PetsFavorites', JSON.stringify([]))
        dispatch(getFavorites()) 
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const { userData } = props;

    useEffect(() => {

    }, [lang]);

    return <React.Fragment>
        <Box>
            <Tooltip title="Account settings">
                <Button onClick={handleClick}>
                    <Grid container>
                        <Grid item>
                            <Avatar sx={{ width: 32, height: 32 }} src={userData.photoURL ? userData.photoURL : null}>{userData.photoURL ? "" : userData.name[0].toUpperCase()}</Avatar>
                        </Grid>
                        <Grid item sx={{display: "flex", alignItems: "center"}} >
                            <Typography sx={{ minWidth: 100, color: "#3B57A9", fontWeight:'700' }}>{userData.name.split(" ")[0]}</Typography>
                        </Grid>
                    </Grid>
                </Button>
            </Tooltip>
        </Box>
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
            <MenuItem onClick={handleClose}>
                <Link to={"/user-info-editor"}>
                    <ListItemIcon>
                        <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <span>{lang.userMenu.labels.editarDatos}</span>
                </Link>
            </MenuItem>
            <MenuItem onClick={HandleSignOut}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                {lang.userMenu.labels.cerrarSesion}
            </MenuItem>
        </Menu>
    </React.Fragment>
};

export default UserAccountMenu;