import React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import perritoHome from '../../assets/image/image_home.png'
import gatitoHome from '../../assets/image/image_quienssomos.png'
import banner3 from '../../assets/image/banner3.png'
import banner4 from '../../assets/image/banner4.png'
import banner5 from '../../assets/image/banner5.png'
import style from "./Home.module.css"
import {useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
 const  handlerAdopciones = (e) =>{
navigate("/adopciones")

   }

   const  handlerDonar = (e) =>{
    navigate("/donaciones")
    }

    const  handlerContacto = (e) =>{
      navigate("/contacto")
      }

  return (
    <>
      <Container >
        <Grid container spacing={2} alignItems="center">
          <Grid item md={8}>
            <img src={perritoHome} alt='perrito home' />
          </Grid>
          <Grid item md={4}>
            <Typography component="h1" variant="h2" sx={{color:'#FF3041', textTransform:'uppercase', fontWeight:'700'}}>
              Me quieres adoptar?
            </Typography>
            <Typography component="p" sx={{margin:'10px 0px'}}>
              Descubre nuestras mascotas rescatadas y adopta o dona. Ayuda a expandirnos
            </Typography>
            <Button variant="contained" color='info' size="large" sx={{borderRadius:'20px'}} onClick={(e) => handlerAdopciones(e)}>¡Adoptame!</Button>
          </Grid>
        </Grid>
      </Container>

      <Box className={style['background-fancy']}>
        <Container >
          <Grid container spacing={2} alignItems="center">
            <Grid item md={6} sx={{color:'#fff'}}>
              <Typography component="h1" variant="h2" sx={{color:'#fff', textTransform:'uppercase', fontWeight:'700'}}>
                Quienes somos
              </Typography>
              <Typography component="p" sx={{margin:'15px 0px'}}>
              Bienvenido! Somos Huellitas de amor una aplicación que se dedica a brindar información sobre animales en adopción. Aquí podrás adoptar y poner en adopción a una mascota que necesite un hogar y mucho amor. Contamos con una sección donde podrás hacer donaciones y recibir información. Súmate a nuestra comunidad a través de nuestras redes sociales!   
              </Typography>
              <Box sx={{display:'flex', gap:'10px', alignItems:'center'}}>
                  <FacebookIcon/>
                  <InstagramIcon/>
                  <TwitterIcon/>
                  <WhatsAppIcon/>
                  <Typography component='span'>
                    @huellitasdeamor
                  </Typography>
              </Box>
            </Grid>
            <Grid item md={6}>
              <img src={gatitoHome} alt=' gatito home' />
            </Grid>
          </Grid>
        </Container>
      </Box>
    
      <Container >
        <Grid container spacing={2} alignItems="center" margin={'100px 0px'}>
          <Grid item md={6}>
            <img src={banner3} alt='banner home' />
          </Grid>
          <Grid item md={6}>
          <Typography component="h1" variant="h2" sx={{color:'#FF3041', textTransform:'uppercase', fontWeight:'700'}}>
              adopciones
            </Typography>
            <Typography component="p" sx={{margin:'10px 0px'}}>
              Descubre nuestras mascotas rescatadas y adopta o dona. Ayuda a expandirnos
            </Typography>
            <Button variant="contained" color='info' size="large" sx={{borderRadius:'20px'}} onClick={(e) => handlerAdopciones(e)}>Ver más!</Button>
          </Grid>
        </Grid>
      </Container>

      <Container>
        <Grid container spacing={2} alignItems="center">
          <Grid item md={6}>
            <img src={banner4} alt='banner home' className={style.bannerContent} />
          </Grid>
          <Grid item md={6}>
            <Typography component="h1" variant="h2" sx={{color:'#FF3041', textTransform:'uppercase', fontWeight:'700'}}>
              haz tu donación
            </Typography>
            <Typography component="p" sx={{margin:'10px 0px'}}>
            Su generosa contribución puede hacer una diferencia en la vida de los animales que están en necesidad y ayudarlos a encontrar sus hogares para siempre. Al donar, te unirás a otros amantes de los animales que comparten la misma misión de proporcionar un refugio seguro para todas las mascotas.
            </Typography>
            <Button variant="contained" color='info' size="large" sx={{borderRadius:'20px'}} onClick={(e) => handlerDonar(e)}>DONA AHORA!</Button>
          </Grid>
        </Grid>
      </Container>
      <Box>
        <Container>
          <Grid container marginTop={'80px'}>
            <Grid item md={4} sx={{marginTop:'20px'}}>
              <Typography component="h1" variant="h2" sx={{color:'#FF3041', textTransform:'uppercase', fontWeight:'700'}}>
              más información
              </Typography>
              <Typography component="p" sx={{margin:'10px 0px'}}>
              Envíanos un mensaje con todas tus dudas e inquietudes, estamos para ayudarte.
              </Typography>
              <Button variant="contained" color='info' size="large" sx={{borderRadius:'20px'}} onClick={(e) => handlerContacto(e)}>contacto</Button>
            </Grid>
            <Grid item md={8} sx={{marginBottom:'-10px'}}>
              <img src={banner5} alt='fondo perro'/>
            </Grid>
          </Grid>

        </Container>
      </Box>
    </>
  )
}

export default Home