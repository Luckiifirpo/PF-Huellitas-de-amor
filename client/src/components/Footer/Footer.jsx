import React from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import style from "./Footer.module.css";
import logoBlanco from "../../assets/image/logoBlanco.svg";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";
import { postContactUs } from "../../redux/slices/contactUsSlice";
import { useNavigate } from "react-router-dom";


import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';



const validationSchema = yup.object({
  email: yup.string("email required").email().required("email required"),
});

const Footer = () => {



  const initialValues = {
    name: "NewsLetter",
    email: "",
    description: "Bienvenido",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      uploadData(values, resetForm);
    },
  });
  const uploadData = async (values, resetForm) => {
    try {
      dispatch(
        postContactUs({
          ...values,
        })
      );
      resetForm();
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <Box
      className={style["bg-footer"]}
      // style={{ position: "relative", zIndex: 1 }}
    >
      <Container>
        <Grid container justifyContent="space-between" className={style.footer}>
          
        <Grid item md={2}>
            <img src={logoBlanco} alt="logo en blanco" className={style.logo} />
        
          </Grid>
          <Grid item md={2} >
           
              <Typography component={Link} to="/">
                Inicio
              </Typography>
              <Typography component={Link} to="/quienes-somos">
                Quienes Somos
              </Typography>
              <Typography component={Link} to="/adopciones">
                Adopciones
              </Typography>
              <Typography component={Link} to="/donaciones">
                Donaciones
              </Typography>
              <Typography component={Link} to="/contacto">
                Contacto
              </Typography>
          </Grid>

        
          <Grid item md={6} sx={{marginTop:'20px', marginRight:'30px'}}>
              <form onSubmit={formik.handleSubmit}>
                <FormControl sx={{ m: 1, width: '28ch' }} variant="standard" >
                      <InputLabel htmlFor="standard-adornment-password" sx={{fontSize:'12px', color:'#fff', letterSpacing:'1px'}}>Email para Huellitas Newsletter</InputLabel>
                      <Input
                        id="email"
                        variant="standard"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        color="warning"

                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                            
                              type="submit"
                              variant="contained"
                              endIcon={<SendIcon />}
                              sx={{ color: "#fff", marginTop:'-10px' }}
                            >
                            <SendIcon />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
              </form>
          </Grid>
            </Grid>
          <Grid item md={2} > 
        
        </Grid>
      </Container>



    </Box>
  );
};

export default Footer;
