import { Avatar, Button, Card, CardActionArea, CardContent, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, TextField } from "@mui/material";
import { Box, Container } from "@mui/system";
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import LeftSideUserCard from "../../components/LeftSideUserCard/LeftSideUserCard";

const UserInfoEditor = (props) => {

    const open_file_input_user_image = (event) => {
        const file_input = document.querySelector("#hidden-user-info-editor-file-input");
        file_input.click();
    }

    const select_user_image = (event) => {
        console.log(event.target.value);
    }

    return <div style={{ minHeight: "calc(100vh - 267px)" }}>
        <Container style={{ marginBottom: 30, marginTop: 130 }}>
            <Grid container spacing={5} alignItems="flex-start">
                <Grid item md={4}>
                    <LeftSideUserCard />
                </Grid>
                <Grid item md={8}>
                    <Box>
                        <Grid container>
                            <Grid item md={6} sx={{ paddingRight: "20px" }}>
                                <Box>
                                    <Grid container spacing={2}>
                                        <Grid item sx={{ width: "100%" }}>
                                            <TextField label="Nombre" sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item sx={{ width: "100%" }}>
                                            <TextField type={"number"} label="Edad" sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item sx={{ width: "100%" }}>
                                            <TextField type={"email"} label="Email" sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item sx={{ width: "100%" }}>
                                            <Card>
                                                <CardActionArea onClick={open_file_input_user_image}>
                                                    <CardContent sx={{ padding: "0px !important" }}>
                                                        <List>
                                                            <ListItem>
                                                                <ListItemAvatar>
                                                                    <Avatar>
                                                                        <CameraAltOutlinedIcon />
                                                                    </Avatar>
                                                                </ListItemAvatar>
                                                                <ListItemText primary="Foto de perfil" secondary="Jan 9, 2014" />
                                                            </ListItem>
                                                        </List>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Grid>
                                        <Grid item sx={{ width: "100%" }}>
                                            <Button variant="contained" color='info' size="medium" sx={{ borderRadius: '20px', paddingLeft: 5, paddingRight: 5 }}>Actualizar Datos</Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item md={6} sx={{ paddingLeft: "20px" }}>
                                <Box>
                                    <Grid container spacing={2}>
                                        <Grid item sx={{ width: "100%" }}>
                                            <TextField label="Apellido" sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item sx={{ width: "100%" }}>
                                            <TextField label="Direccion" sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item sx={{ width: "100%" }}>
                                            <TextField label="Ocupacion" sx={{ width: "100%" }} />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Container>
        <input onChange={select_user_image} type="file" id="hidden-user-info-editor-file-input" hidden/>
    </div>
}

export default UserInfoEditor;