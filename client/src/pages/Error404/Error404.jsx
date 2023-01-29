import React from 'react';
import { Button, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import error404 from "../../assets/image/error404-img.png";
import { useNavigate } from "react-router-dom";
import style from "./Error404.module.css";


const Error404 = () => {
  const navigate = useNavigate()
  const handlerInicio = (e) => {
    navigate("/")

  }
  return (
    <div className={style.page_404_div}>
      <Container style={{minHeight:"100vh", display: "flex"}}>
        <Grid container spacing={2} alignItems={"center"} textAlign={"center"}>

          <Grid item md={6} alignItems="center">
            <Typography component="h1" variant="h1" sx={{ fontSize: '250px', lineHeight: '150px', color: '#FF3041', textTransform: 'uppercase', fontWeight: '700' }}>
              404
            </Typography>
            <Typography component="p" sx={{ fontFamily: 'Outfit', fontSize: '30px', lineHeight: '36px', fontWeight: '400', color: '#3B57A9', textAlign: 'center' }}>
              Ups... La página no ha sido encontrada (Error 404)
            </Typography>
            <Button variant="contained" color='info' size="large" sx={{ borderRadius: '20px', marginTop: '20px' }} onClick={(e) => handlerInicio(e)}>volver al inicio</Button>
          </Grid>
          <Grid item md={6} style={{ padding: 40 }}>
            <img src={error404} alt='perrito sad' />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Error404;