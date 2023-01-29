import { Avatar, Grid, List, ListItemButton, ListItemIcon, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import SettingsIcon from '@mui/icons-material/Settings';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from "react-redux";
import { useEffect } from "react";

const LeftSideUserCard = (props) => {

    const currentUser = useSelector((state) => state.users.currentUser);
    const lang = useSelector((state) => state.lang.currentLangData);

    useEffect(() => {

    }, [currentUser, lang]);

    return <Box sx={{ width: "min-content" }}>
        <Grid container spacing={2}>
            <Grid item md={12}>
                <Avatar sx={{ width: "220px", height: "220px" }} src={(currentUser && currentUser.photoURL ? currentUser.photoURL : null)}>
                    {currentUser && currentUser.photoURL ? null :
                        <p style={{ height: "70px", fontSize: "100px" }}>
                            {
                                currentUser ? currentUser.name["0"].toUpperCase() : null
                            }
                        </p>
                    }
                </Avatar>
            </Grid>
            <Grid item md={12}>
                <Typography textAlign="center" component="h1" variant="h4" color="primary">
                    {
                        currentUser ? currentUser.name.split(" ")[0] : null
                    }
                </Typography>
            </Grid>
            <Grid item md={12}>
                <Box>
                    <Paper>
                        <List>
                            <ListItemButton>
                                <ListItemIcon>
                                    <SettingsIcon />
                                </ListItemIcon>
                                {lang.leftSideUserBar.labels.configuracion}
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <FavoriteIcon />
                                </ListItemIcon>
                                {lang.leftSideUserBar.labels.favoritos}
                            </ListItemButton>
                        </List>
                    </Paper>
                </Box>
            </Grid>
        </Grid>
    </Box>
}

export default LeftSideUserCard;