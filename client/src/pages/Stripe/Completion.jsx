import Typography from "@mui/material/Typography"
import Container from '@mui/material/Container';
import React from 'react';
import { Button, Grid } from "@mui/material";

import fondogracias from "../../assets/image/fondogracias.png";
import { useNavigate } from "react-router-dom";
import style from './Stripe.module.css'



function Completion(props) {

   const navigate = useNavigate()
   const handlerInicio = (e) => {
      navigate("/")

   }
   return (
      <>
         <div className={style.page_gracias_div}>
         <Container style={{ minHeight: "100vh", display: "flex" }}>
            <Grid container spacing={2} alignItems={"center"} textAlign={"center"}>
               <Grid item md={6} style={{ padding: 40 }}>
                  <img style={{ width: '50vh', marginLeft:'-150px'}} src={fondogracias} alt='gatito feliz' />
               </Grid>
               <Grid item md={6} alignItems="center" sx={{paddingRight:'40px'}}>
                  <Typography component="h1" variant="h1" sx={{ fontSize: '70px', lineHeight: '90px', color: '#FF3041', textTransform: 'uppercase', fontWeight: '700' }}>
                     ¡Gracias por tu Donación! 🎉
                  </Typography>
                  <Typography component="p" sx={{ fontFamily: 'Outfit', fontSize: '30px', lineHeight: '36px', fontWeight: '400', color: '#3B57A9', textAlign: 'center' }}>
                     Cada granito de arena cuenta
                  </Typography>
                  <Button variant="contained" color='info' size="large" sx={{ borderRadius: '20px', marginTop: '20px' }} onClick={(e) => handlerInicio(e)}>volver al inicio</Button>
               </Grid>
            </Grid>
         </Container>
         </div>
      </>
   )
}

export default Completion;