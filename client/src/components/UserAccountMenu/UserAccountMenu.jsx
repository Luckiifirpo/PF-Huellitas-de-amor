import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography, } from "@mui/material";
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import React from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../../redux/slices/userSlice";

const UserAccountMenu = (props) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const HandleSignOut = () => {
        dispatch(signOut())
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const { userData } = props;

    return <React.Fragment>
        <Box>
            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar sx={{ width: 32, height: 32 }} src={userData.photoURL ? userData.photoURL : null}>{userData.photoURL ? "" : userData.name[0]}</Avatar>
                    <Typography sx={{ minWidth: 100 }}>{userData.name.split(" ")[0]}</Typography>
                </IconButton>
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
                <ListItemIcon>
                    <Settings fontSize="small" />
                </ListItemIcon>
                Configuración
            </MenuItem>
            <MenuItem onClick={HandleSignOut}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Cerrar Sesión
            </MenuItem>
        </Menu>
    </React.Fragment>
};

export default UserAccountMenu;