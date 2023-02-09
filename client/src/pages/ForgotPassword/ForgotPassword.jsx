import { Button, ButtonGroup, Divider, Grid, Paper, TextField, Typography, Box } from "@mui/material";
import { Container } from "@mui/system";
import logo from "../../assets/image/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ImageContact from "../../assets/image/fondocontacto.png";
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
        //    console.log(emailInput.value + " state")

           dispatch(postForgotPassword(emailInput.value)).then(navigate("/"));
        }

        return(
         <>
            <Box
                className={style.gridContact}
                sx={{ marginBottom: "300px", marginTop: "150px" }}
            >
            <Box className={style.gridContactImage}>
            <img src={ImageContact} alt="" />
            </Box>

            <Container sx={{ height: "100%" }}>
                <form onSubmit={userForgotPassword}>
                    <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    sx={{ height: "100%" }}
                    >
                    <Grid item md={12}>
                        <Typography
                        component="h1"
                        variant="h3"
                        align="center"
                        sx={{
                            color: "#FF3041",
                            textTransform: "uppercase",
                            fontWeight: "700",
                            marginTop: "300px",
                            marginBottom: "50px"
                        }}
                        >
                        {"Recupera tu cuenta"}
                        </Typography>
                    </Grid>

                    <Box
                        sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                        justifyContent: "center",
                        height: "100%",
                        margin: " 0 20px 0 35px",
                        }}
                    >
                        <Grid container spacing={2} flexDirection={"column"} alignItems={"center"}>
                            <Grid item>
                            <TextField type="email" size="small" id="email-input" label={"Ingresa tu email"} variant="standard" className={style.input_width} />
                            </Grid>
                                
                            <Grid item>
                            <Button type="submit" variant="contained" color='info' size="medium" sx={{ borderRadius: '20px' }} className={style.input_width}>{"Enviar"}</Button>
                            </Grid>
                        </Grid>
                    </Box>
                    {/* </Grid> */}
                    </Grid>
                </form>
            </Container>
      </Box>
            {/* <Container style={{ minHeight: "100vh", display: "flex" }}>
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
            </Container> */}
        </>
    );

    }
     
    export default ForgotPassword;
