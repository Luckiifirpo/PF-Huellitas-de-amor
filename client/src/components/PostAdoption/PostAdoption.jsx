import React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import style from './PostAdoption.module.css'
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddAPhotoTwoToneIcon from '@mui/icons-material/AddAPhotoTwoTone';
import ImagePostAdoption from '../../assets/image/fondoPostAdoption.png'

const PostAdoption = () => {
  return (
    <>
        <Box className={style.gridContact} sx={{marginBottom:'300px'}}>
            <Box className={style.gridContactImage}>
            <img src={ImagePostAdoption} alt="" />
            </Box>
            <Container sx={{height:'100%'}}>
                <Grid 
                container
                justifyContent="center"
                alignItems="center"
                sx={{height:'100%'}}
                >
                <Grid md={12}>
                    <Typography component="h1" variant="h3" align='center' sx={{color:'#FF3041', textTransform:'uppercase', fontWeight:'700', marginTop:'200px'}}>
                            Dar en adopcion
                    </Typography>
                </Grid>
                <Grid item md={6} >
                    <Box component="form" sx={{display:'flex',flexDirection:'column', gap:'15px', justifyContent:'center',height:'100%', margin:' 0 20px 0 150px'}}>
                    <TextField label="Nombre:" variant="standard" />
                    <TextField label="Fecha de publicación:" variant="standard" />
                    <TextField label="Especie:" variant="standard" />
                    <TextField label="Edad:" variant="standard" />
                    <TextField label="Peso:" variant="standard" />
                    </Box>
                </Grid>
                <Grid item md={6} >
                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                        <Fab color="primary" aria-label="add">
                            <AddAPhotoTwoToneIcon />
                        </Fab>
                    </Box>
                    <Box component="form" sx={{display:'flex',flexDirection:'column', gap:'15px', justifyContent:'center',height:'100%', margin:' 0 150px 0 20px'}}>
                    <TextField label="Tamaño:" variant="standard" />
                    <TextField label="Género:" variant="standard" />
                    <TextField label="Raza:" variant="standard" />
                    <TextField label="Desripción:" variant="standard" />
                    </Box>
                </Grid>
                <Button variant="contained" color='info' size="large" sx={{borderRadius:'20px', padding:'9px 150px'}}>
                    Publicar
                </Button>
                </Grid>
            </Container>
        </Box>
      </>
  )
}

export default PostAdoption