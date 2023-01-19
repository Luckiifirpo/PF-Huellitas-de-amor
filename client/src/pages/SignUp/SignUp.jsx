import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import logo from "../../assets/image/logo.svg";
import sign_up_img from "../../assets/image/sign-up-img.png";
import style from "./SignUp.module.css";

const SignUp = (props) => {
    return (
        <div>
            <Container style={{ marginBottom: 30, marginTop: 30 }} >
                <Grid container spacing={4} alignItems="center">
                    <Grid item lg={7}>
                        <img src={sign_up_img} />
                    </Grid>
                    <Grid item lg={1}>

                    </Grid>
                    <Grid item lg={4}>
                        <Paper style={{ paddingBottom: 20 }}>
                            <Grid container spacing={2} flexDirection={"column"} alignItems={"center"}>
                                <Grid item>
                                    <img className={style.logo} src={logo} />
                                </Grid>
                                <Grid item>
                                    <Typography component="h1" sx={{ color: '#FF3041', fontWeight: 'Bold' }}>
                                        Registrate
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <TextField size="small" id="first-name-input" label="Nombre" variant="standard" className={style.input_width} />
                                </Grid>
                                <Grid item>
                                    <TextField size="small" id="last-name-input" label="Apellido" variant="standard" className={style.input_width} />
                                </Grid>
                                <Grid item>
                                    <TextField type="number" size="small" id="last-name-input" label="Edad" variant="standard" className={style.input_width} />
                                </Grid>
                                <Grid item>
                                    <TextField size="small" id="address-input" label="Direccion" variant="standard" className={style.input_width} />
                                </Grid>
                                <Grid item>
                                    <TextField type="email" size="small" id="email-input" label="Correo" variant="standard" className={style.input_width} />
                                </Grid>
                                <Grid item>
                                    <TextField size="small" id="occupation-input" label="Ocupacion" variant="standard" className={style.input_width} />
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color='info' size="large" sx={{ borderRadius: '20px', marginTop:8 }} className={style.input_width}>Crear Cuenta</Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default SignUp;