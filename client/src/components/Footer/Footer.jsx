import React from 'react'
import { Box, Container, Grid, Typography, Button } from '@mui/material'
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom'
import SendIcon from '@mui/icons-material/Send';
import style from "./Footer.module.css"
import logoBlanco from "../../assets/image/logoBlanco.svg"


const Footer = () => {
  return (
    <Box className={style['bg-footer']}>
        <Container>
            <Grid container justifyContent="space-between" className={style.footer}>
                <Grid item md={3}>
                    <Box>
                        <Typography component={Link} to='/'>
                            Inicio
                        </Typography>
                
                    </Box>
                    <Box sx={{marginTop:1.5}}>
                        <Typography component={Link} to='/quienes-somos'>
                            Quienes Somos
                        </Typography>
                    </Box>
                </Grid>
                <Grid item md={3}>
                    <Box>
                        <Typography component={Link} to='/adopciones'>
                            Adopciones
                        </Typography>
                    </Box>
                    <Box sx={{marginTop:1.5}}>
                        <Typography component={Link} to='/donaciones'>
                            Donaciones
                        </Typography>
        
                    </Box>
                </Grid>
                <Grid item md={3}>
                <Box>
                    <Typography component={Link} to='/contacto'>
                            Contacto
                        </Typography>
                    </Box>
                    <Box sx={{marginTop:1.5, display:'flex'}}>
                    <TextField id="standard-basic" label="Tu email" variant="standard" color="warning" />
                    <Button variant="contained" endIcon={<SendIcon />} sx={{backgroundColor:'#FFAB13'}}>
                        Send
                    </Button>
                    {/* <TextField id="outlined-basic" label="Tu email" variant="outlined" className={style.newsletter} sx={{backgroundColor:"rgba(255,255,255, 18%)"}} color="warning"/>  */}
                    </Box>
                </Grid>
                <Grid item md={3}>
                    <img src={logoBlanco} alt="logo en blanco" className={style.logo}/>

                </Grid>
            </Grid>
        </Container>
    </Box>
  )
}

export default Footer