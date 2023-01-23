import { Button, ButtonGroup, Divider, Grid, Paper, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import logo from "../../assets/image/logo.svg";
import login_img from "../../assets/image/login-img.png";
import style from "./Login.module.css";
import { MicrosoftLoginButton, GoogleLoginButton, GithubLoginButton } from "react-social-login-buttons";
import { Link } from "react-router-dom";
import { getAuth, GithubAuthProvider, GoogleAuthProvider, OAuthProvider, signInWithPopup } from "firebase/auth";
import FirebaseApp from "../../services/firebaseApp";

const Login = (props) => {

    const firebaseAuth = getAuth(FirebaseApp);
    firebaseAuth.languageCode = 'es';

    const googleAuthProvider = new GoogleAuthProvider();
    const githubAuthProvider = new GithubAuthProvider();
    const microsoftAuthProvider = new OAuthProvider("microsoft.com");


    const loginWithGoogle = () => {
        signInWithPopup(firebaseAuth, googleAuthProvider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    }

    const loginWithGithub = () => {
        signInWithPopup(firebaseAuth, githubAuthProvider)
            .then((result) => {
                const credential = GithubAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GithubAuthProvider.credentialFromError(error);
            });
    }

    const loginWithMicrosoft = () => {
        signInWithPopup(firebaseAuth, microsoftAuthProvider)
            .then((result) => {
                const credential = OAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = OAuthProvider.credentialFromError(error);
            });
    }

    return (
        <div className={style.login_div}>
            <Container style={{ minHeight: "100vh", display: "flex" }}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item lg={7}>
                        <img src={login_img} />
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
                                        <GithubLoginButton iconSize="16px" onClick={loginWithGithub} color="secondary" variant="outlined" className={style.input_width + " " + style.auth_button}>
                                            <span>Continuar con GitHub</span>
                                        </GithubLoginButton>
                                        <GoogleLoginButton iconSize="16px" onClick={loginWithGoogle} color="secondary" variant="outlined" className={style.input_width + " " + style.auth_button}>
                                            <span>Continuar con Google</span>
                                        </GoogleLoginButton>
                                        <MicrosoftLoginButton iconSize="16px" onClick={loginWithMicrosoft} color="secondary" variant="outlined" className={style.input_width + " " + style.auth_button}>
                                            <span>Continuar con Microsoft</span>
                                        </MicrosoftLoginButton>
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