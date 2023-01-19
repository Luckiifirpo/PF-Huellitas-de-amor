import React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import style from './Contact.module.css'
import TextField from '@mui/material/TextField';
import ImageContact from '../../assets/image/fondocontacto.png'

const Contact = () => {
  return (
    <>
      <Box className={style.gridContact}>
        <Box className={style.gridContactImage}>
          <img src={ImageContact} alt="" />
        </Box>
        <Container sx={{height:'100%'}}>
            <Grid 
              container
              justifyContent="center"
              alignItems="center"
              sx={{height:'100%'}}
            >
              <Grid item md={6} >
                <Box component="form" sx={{display:'flex',flexDirection:'column', gap:'15px', justifyContent:'center',height:'100%', margin:'0px 70px'}}>
                  <Typography component="h1" variant="h4" align='center' sx={{color:'#FF3041', textTransform:'uppercase', fontWeight:'700'}}>
                    CONTACTANOS
                  </Typography>
                  <TextField label="Nombre" variant="standard" />
                  <TextField label="Correo" variant="standard" />
                  <TextField label="Mensaje" variant="standard" />

                  <Button variant="contained" color='info' size="large" sx={{borderRadius:'20px', marginTop:'30px'}}>Enviar</Button>

                </Box>
              </Grid>
            </Grid>
        </Container>
      </Box>
    </>
  )
}

export default Contact