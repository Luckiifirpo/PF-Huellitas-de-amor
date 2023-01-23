import { Button, ButtonGroup, Divider, Grid, Paper, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import logo from "../../assets/image/logo.svg";
import login_img from "../../assets/image/login-img.png";
import style from "./Login.module.css";
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from "react-router-dom";

const Login = (props) => {
    return (
        <div className={style.login_div}>
            <Container style={{minHeight:"100vh", display: "flex"}}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item lg={7}>
                        <img src={login_img} />
                    </Grid>
                    <Grid item lg={1}>

                    </Grid>
                    <Grid item lg={4}>
                        <Paper style={{paddingBottom: 20}}>
                            <Grid container spacing={2} flexDirection={"column"} alignItems={"center"}>
                                <Grid item>
                                    <img className={style.logo} src={logo} />
                                </Grid>
                                <Grid item>
                                    <Typography component="h1" sx={{ color: '#FF3041', fontWeight: 'Bold' }}>
                                        Bienvenido
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <TextField size="small" id="email-input" label="Email" variant="standard" className={style.input_width} />
                                </Grid>
                                <Grid item>
                                    <TextField size="small" id="password-input" type="password" label="Password" variant="standard" className={style.input_width} />
                                </Grid>
                                <Grid item>
                                    <Link to="/restore_password" className={style.link}>¿Olvidaste tu contraseña?</Link>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color='info' size="medium" sx={{ borderRadius: '20px' }} className={style.input_width}>Continuar</Button>
                                </Grid>
                                <Grid item>
                                    <Divider className={style.divider} />
                                </Grid>
                                <Grid item>
                                    <ButtonGroup orientation="vertical">
                                        <Button color="secondary" variant="outlined" className={style.input_width + " " + style.auth_button}>
                                            <GoogleIcon style={{ marginRight: 10 }} />
                                            <span>Continuar con Dropbox</span>
                                        </Button>
                                        <Button color="secondary" variant="outlined" className={style.input_width + " " + style.auth_button}>
                                            <GoogleIcon style={{ marginRight: 10 }} />
                                            <span>Continuar con Google</span>
                                        </Button>
                                    </ButtonGroup>
                                </Grid>
                                <Grid item>
                                    <Divider className={style.divider} />
                                </Grid>
                                <Grid item display={"flex"} justifyContent={"space-around"} alignItems={"center"} className={style.input_width}>
                                    <Typography component="p" sx={{ margin: '10px 0px' }}>¿No estas registrado?</Typography>
                                    <Link to={"/registro-usuario"} className={style.link}>Registrate</Link>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Login;