import { PutresetPassword } from "../../redux/slices/userSlice";
import { Button, ButtonGroup, Divider, Grid, Paper, TextField, Typography, Box } from "@mui/material";
import { Container } from "@mui/system";
import logo from "../../assets/image/logo.svg";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import login_img from "../../assets/image/login-img.png";
import { postForgotPassword } from "../../redux/slices/userSlice";
import style from './ResetPassword.module.css';
import { useState } from "react";

const ResetPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

     const { id } = useParams();
    
    const userResetPassword =  (e, value) => {
       e.preventDefault();
       let passwordInput = e.target.querySelector("#password-input");
       let rePasswordInput = e.target.querySelector("#repassword-input");

       dispatch(PutresetPassword(id, passwordInput.value, rePasswordInput.value));
       setTimeout(() => {
        navigate("/iniciar-sesion");
      }, 1000);
       
    }

     return(
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
                                    {"Ingresa tu Nueva contraseña"}
                                </Typography>
                            </Grid>
                        </Grid>
                        <form onSubmit={userResetPassword}>
                            <Grid container spacing={2} flexDirection={"column"} alignItems={"center"}>                         
                                <Grid item>                               
                                   <TextField size="small" id="password-input" type="password" align='center'
                                      label={"Nueva contraseña"} variant="standard" className={style.input_width} />                                
                                </Grid>
                                <Grid item>
                                   <TextField size="small" id="repassword-input" type="password" align='center'
                                      label={"Repite la contraseña"} variant="standard" className={style.input_width} />
                                </Grid>
                                
                                <Grid item>
                                    <Button type="submit" variant="contained" color='info' size="medium" sx={{ borderRadius: '20px' }} className={style.input_width}>{"Cambiar contraseña"}</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper> 
                </Grid>
            </Grid>  
        </Container>
    </div>
);
{/* <>
    <Box className={style.gridContact} marginTop={'110px'}>
    <Box className={style.gridContactImage}>
    </Box>
        <Container sx={{height:'100%'}}>
            <Grid 
                container
                justifyContent="center"
                alignItems="center"
                sx={{height:'100%'}}
            >
                <Grid container spacing={2} flexDirection={"column"} alignItems={"center"}>
                                <Grid item>
                                    <img className={style.logo} src={logo} />
                                </Grid>
                                <Grid item>
                                    <Typography component="h1" sx={{ color: '#FF3041', fontWeight: 'Bold' }}>
                                        {"Restablece tu contraseña"}
                                    </Typography>
                                </Grid>
                            </Grid>
                <Grid item md={6} >
                <Box component="form" sx={{display:'flex',flexDirection:'column', gap:'15px', justifyContent:'center',height:'100%', margin:'0px 70px'}}>
                <Grid container spacing={2} flexDirection={"column"} alignItems={"center"}>
                    <Box component="form" sx={{display:'flex',flexDirection:'column', gap:'15px', justifyContent:'center',height:'100%', margin:'0px 70px'}}>
                            <Grid item>
                        
                            <TextField size="small" id="password-input" type="password" align='center'
                                label={"Nueva contraseña"} variant="standard" className={style.input_width} />
                        
                        </Grid>
                        <Grid item>
                            <TextField size="small" id="repassword-input" type="password" align='center'
                                label={"Repite la contraseña"} variant="standard" className={style.input_width} />
                        </Grid>
                        </Box>
                        <Grid item>
                            <Button type="submit" variant="contained" color='info' size="medium" sx={{ borderRadius: '20px' }} className={style.input_width}>{"Cambiar contraseña"}</Button>
                        </Grid>
                    </Grid>
                </Box>
                </Grid>
            </Grid>
        </Container>
    </Box>
</>
); */}
}
 
export default ResetPassword;