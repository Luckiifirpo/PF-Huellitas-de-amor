import { Button, ButtonGroup, Divider, Grid, Paper, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import logo from "../../assets/image/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { postForgotPassword } from "../../redux/slices/userSlice";
import style from './ForgotPassword.module.css';

// const validationSchema = yup.object({
//     email: yup
//         .string('Enter your email')
//         .email('Enter a valid email')
//         .required('Email is required')
//     });

    const ForgotPassword = (props) => {

        const dispatch = useDispatch()
        
        const navigate = useNavigate();
        const lang = useSelector((state) => state.lang.currentLangData);


        const userForgotPassword =  (e, value) => {
           e.preventDefault();
           const emailInput = document.querySelector("#email-input");
           console.log(emailInput.value + " state")

           dispatch(postForgotPassword(emailInput.value));
        }

        return(
         <div className={style.login_div}>
            <Container style={{ minHeight: "100vh", display: "flex" }}>
               <Grid container spacing={4} alignItems="center">
                 <Grid item lg={4}>
                    <Paper style={{ paddingBottom: 20 }}>
                        <Grid container spacing={2} flexDirection={"column"} alignItems={"center"}>
                            <Grid item>
                                <img className={style.logo} src={logo} />
                            </Grid>
                            <Grid item>
                                <Typography component="h1" sx={{ color: '#FF3041', fontWeight: 'Bold', marginLeft: '10px' }}>
                                    {"Ingresa tu correo electrónico para buscar tu cuenta."}
                                </Typography>
                            </Grid>
                        </Grid>
                        <form onSubmit={userForgotPassword}>
                            <Grid container spacing={2} flexDirection={"column"} alignItems={"center"}>
                                <Grid item>
                                  <TextField type="email" size="small" id="email-input" label={"ingresa tu email"} variant="standard" className={style.input_width} />
                                </Grid>
                                    
                                <Grid item>
                                   <Button type="submit" variant="contained" color='info' size="medium" sx={{ borderRadius: '20px' }} className={style.input_width}>{"Enviar"}</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper> 
                  </Grid>   
                </Grid> 
            </Container>
        </div>
    );
    }
     
    export default ForgotPassword;