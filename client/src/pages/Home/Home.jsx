import React, { useEffect } from 'react'
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
import { useNavigate } from "react-router-dom";
import Link from '@mui/material/Link';

import PropTypes from 'prop-types';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import Toolbar from '@mui/material/Toolbar';
import { useSelector } from 'react-redux'

function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const Home = () => {
  const navigate = useNavigate()
  const lang = useSelector((state) => state.lang.currentLangData);


  const handlerAdopciones = (e) => {
    navigate("/adopciones")
  }

  const handlerDonar = (e) => {
    navigate("/donaciones")
  }

  const handlerContacto = (e) => {
    navigate("/contacto")
  }
  const handlerQuienesSomos = (e) => {
    navigate("/quienes-somos")
  }

  const handlerPostAdoption = (e) => {
    navigate("/dar-en-adopcion")
  }

  useEffect(() => {

  }, [lang]);

  return (
    <>
      <Toolbar id="back-to-top-anchor" />
      <Box className={style.contenedorpadre} >
      <Container className={style.adoptar} >
        <Grid container spacing={2} alignItems="center" marginTop={'50px'}>
          <Grid item md={8}>
            <img src={perritoHome} alt='perrito home' />
          </Grid>
          <Grid item md={4}className={style.centradosgrid}>
            <Typography component="h1" variant="h2" sx={{ color: '#FF3041', textTransform: 'uppercase', fontWeight: '700' }}>
              {lang.home.titles.meQuieresAdoptar}
            </Typography>
            <Typography component="p" sx={{ margin: '10px 0px' }}>
              {lang.home.paragraphs.meQuieresAdoptar}
            </Typography>
            <Button variant="contained" color='yellowButton' size="large" sx={{ borderRadius: '20px' }} onClick={(e) => handlerAdopciones(e)}>{lang.home.buttons.adoptame}</Button>
          </Grid>
        </Grid>
      </Container>

      <Box className={style['background-fancy']}>
        <Container >
          <Grid container spacing={2} alignItems="center">
            <Grid item md={6} sx={{ color: '#fff' }}className={style.centradosgrid}>
              <Typography component="h1" variant="h2" sx={{ color: '#fff', textTransform: 'uppercase', fontWeight: '700' }}>
                {lang.home.titles.quienesSomos}
              </Typography>
              <Typography component="p" sx={{ margin: '15px 0px' }}>
                {lang.home.paragraphs.quienesSomos}
              </Typography>
              <Button variant="contained" color='yellowButton' size="large" sx={{ borderRadius: '20px', marginBottom: '20px' }} onClick={(e) => handlerQuienesSomos(e)}>{lang.home.buttons.verMas}</Button>
              <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Link href="https://www.facebook.com/" target="_blank" rel="noopener">
                  <FacebookIcon sx={{backgroundColor:"#fff", borderRadius:"4px"}} />
                </Link>
                <Link href="https://www.instagram.com/" target="_blank" rel="noopener">
                  <InstagramIcon sx={{backgroundColor:"#fff", borderRadius:"4px"}}/>
                </Link>
                <Link href="https://www.whatsapp.com/" target="_blank" rel="noopener">
                  <WhatsAppIcon sx={{backgroundColor:"#fff", borderRadius:"4px"}}/>
                </Link>
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

      <Container className={style.darEnAdopcion}>
        <Grid container spacing={2} alignItems="center">
          <Grid item md={6}>
            <img src={banner3} alt='banner home' />
          </Grid>
          <Grid item md={6}className={style.centradosgrid}>
            <Typography component="h1" variant="h2" sx={{ color: '#FF3041', textTransform: 'uppercase', fontWeight: '700' }}>
              {lang.home.titles.darEnAdopcion}
            </Typography>
            <Typography component="p" sx={{ margin: '10px 0px' }}>
              {lang.home.paragraphs.darEnAdopcion}
            </Typography>
            <Button variant="contained" color='yellowButton' size="large" sx={{ borderRadius: '20px' }} onClick={(e) => handlerPostAdoption(e)}>{lang.home.buttons.publicar}</Button>
          </Grid>
        </Grid>
      </Container>

      <Container className={style.hazTuDonacion} >
        <Grid container spacing={2} alignItems="center">
          <Grid item md={6} className={style.centradosgrid}>
            <Typography component="h1" variant="h2" sx={{ color: '#FF3041', textTransform: 'uppercase', fontWeight: '700' }}>
              {lang.home.titles.hazTuDonacion}
            </Typography>
            <Typography component="p" sx={{ margin: '10px 0px' }}>
              {lang.home.paragraphs.hazTuDonacion}
            </Typography>
            <Button variant="contained" color='yellowButton' size="large" sx={{ borderRadius: '20px' }} onClick={(e) => handlerDonar(e)}>{lang.home.buttons.donaAhora}</Button>
          </Grid>
          <Grid item md={6}>
            <img src={banner4} alt='banner home' className={style.bannerContent} />
          </Grid>
        </Grid>
      </Container>
      <Box>
        <Container className={style.masInformacion}>
          <Grid spacing={{ xs: 5, md: 0 }} container marginTop={'40px'}>

            <Grid item md={6} sx={{  }}>
              <img src={banner5} alt='fondo perro' className={style.imageInfo} />
            </Grid>
            <Grid item md={6} sx={{ marginTop: '20px' }} className={style.centradosgrid}>
              <Typography component="h1" variant="h2" sx={{ color: '#FF3041', textTransform: 'uppercase', fontWeight: '700' }}>
                {lang.home.titles.masInformacion}
              </Typography>
              <Typography component="p" sx={{ margin: '10px 0px' }}>
                {lang.home.paragraphs.masInformacion}
              </Typography>
              <Button variant="contained" color='yellowButton' size="large" sx={{ borderRadius: '20px' }} onClick={(e) => handlerContacto(e)}>{lang.home.buttons.contacto}</Button>
            </Grid>

          </Grid>

        </Container>


        <ScrollTop>
          <Fab size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon sx={{ color: '#FF3041'}} />
          </Fab>
        </ScrollTop>
      </Box>
      </Box>
    </>
  )
}

export default Home