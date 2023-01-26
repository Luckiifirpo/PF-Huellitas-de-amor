import { Avatar, Grid, List, ListItemButton, ListItemIcon, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import SettingsIcon from '@mui/icons-material/Settings';
import FavoriteIcon from '@mui/icons-material/Favorite';

const LeftSideUserCard = (props) => {
    return <Box sx={{ width: "min-content" }}>
        <Grid container spacing={2}>
            <Grid item md={12}>
                <Avatar sx={{ width: "220px", height: "220px" }}>
                    <p style={{height: "70px", fontSize: "100px"}}>
                        Y
                    </p>
                </Avatar>
            </Grid>
            <Grid item md={12}>
                <Typography textAlign="center" component="h1" variant="h4" color="primary">
                    Your Name
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
                                Configuracion
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <FavoriteIcon />
                                </ListItemIcon>
                                Favoritos
                            </ListItemButton>
                        </List>
                    </Paper>
                </Box>
            </Grid>
        </Grid>
    </Box>
}

export default LeftSideUserCard;