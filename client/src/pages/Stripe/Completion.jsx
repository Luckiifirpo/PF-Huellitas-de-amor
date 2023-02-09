import Typography from "@mui/material/Typography"
import Container from '@mui/material/Container';
import React from 'react';
import { Button, Grid } from "@mui/material";

import fondogracias from "../../assets/image/fondoGracias.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"
import style from './Stripe.module.css'



function Completion(props) {
   const navigate = useNavigate()
   const lang = useSelector((state) => state.lang.currentLangData);
   const handlerInicio = (e) => {
      navigate("/")

   }
   return (
      <>
         <div className={style.page_gracias_div}>
         <Container style={{ minHeight: "100vh", display: "flex" }}>
            <Grid container spacing={2} alignItems={"center"} textAlign={"center"}>
               <Grid item md={6} style={{ padding: 40 }}>
                  <img className={style.fondoGracias} style={{ width: '50vh', marginLeft:'-150px'}} src={fondogracias} alt='gatito feliz' />
               </Grid>
               <Grid item md={6} alignItems="center" sx={{paddingRight:'40px'}}>
                  <Typography component="h1" variant="h1" sx={{ fontSize: '70px', lineHeight: '90px', color: '#FF3041', textTransform: 'uppercase', fontWeight: '700' }}>
                     ¡{lang.stripe.completion.paragraphs.agradecimiento}! 🎉
                  </Typography>
                  <Typography component="p" sx={{ fontFamily: 'Outfit', fontSize: '30px', lineHeight: '36px', fontWeight: '400', color: '#3B57A9', textAlign: 'center' }}>
                     {lang.stripe.completion.paragraphs.frase}
                  </Typography>
                  <Button variant="contained" color='yellowButton' size="large" sx={{ borderRadius: '20px', marginTop: '20px' }} onClick={(e) => handlerInicio(e)}>{lang.stripe.completion.button.volverAlInicio}</Button>
               </Grid>
            </Grid>
         </Container>
         </div>
      </>
   )
}

export default Completion;
