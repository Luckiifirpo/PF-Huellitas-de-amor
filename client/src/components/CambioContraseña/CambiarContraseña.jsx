
import React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import style from './CambiarContraseña.module.css'
import TextField from '@mui/material/TextField';
import ImageContact from '../../assets/image/fondocontacto.png'
import api from '../../services/api'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { async } from '@firebase/util'
import { FilledInput, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const CambioContraseña = () => {

  const [passowrdConfig, setPassWordConfig] = useState({ oldPassword: null, newPassword: null, repeatedNewPassword: null })
  const currentUser = useSelector((state) => state.users.currentUser);
  const [showPassword, setShowPassword] = useState(false)

  const handlerContraseñaAnterior = (e) => {
    const value = e.target.value
    setPassWordConfig({
      ...passowrdConfig,
      oldPassword: value
    })
  }
  const handlerNuevaContraseña = (e) => {
    const value = e.target.value
    setPassWordConfig({
      ...passowrdConfig,
      newPassword: value
    })
  }
  const handlerRepetirContraseña = (e) => {
    const value = e.target.value
    setPassWordConfig({
      ...passowrdConfig,
      repeatedNewPassword: value
    })

  }
  const handlerEnviarContraseña = async (e) => {
    if (currentUser) {
      const response = await api.put("/users/user_password/" + currentUser.id, passowrdConfig);
    }
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Box className={style.gridContact} marginTop={'110px'}>
        <Box className={style.gridContactImage}>
        </Box>
        <Container sx={{ height: '100%' }}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ height: '100%' }}
          >
            <Grid item md={6} >
              <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '15px', justifyContent: 'center', height: '100%', margin: '0px 70px' }}>
                <Typography component="h1" variant="h4" align='center' sx={{ color: '#FF3041', textTransform: 'uppercase', fontWeight: '700' }}>
                  CONTRASEÑA
                </Typography>
                <Typography component="h4" variant="h6" align='center' sx={{ color: '#FF3055', fontWeight: '700' }}>
                  cambiar contraseña
                </Typography>
                <FormControl sx={{ m: 1}} variant="outlined">
                  <InputLabel htmlFor="contraseña-anterior">Contraseña Anterior</InputLabel>
                  <FilledInput
                   onChange={handlerContraseñaAnterior}
                    id="contraseña-anterior"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Contraseña Anterior"
                  />
                </FormControl>
                <FormControl sx={{ m: 1 }} variant="outlined">
                  <InputLabel htmlFor="nueva-contraseña">Nueva Cotraseña</InputLabel>
                  <FilledInput
                  onChange={handlerNuevaContraseña}
                    id="nueva-contraseña"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Nueva Contraseña"
                  />
                </FormControl>
                <FormControl sx={{ m: 1 }} variant="outlined">
                  <InputLabel htmlFor="confirmar-nueva-contraseña">Confirmar Nueva Contraseña</InputLabel>
                  <FilledInput
                   onChange={handlerRepetirContraseña}
                    id="confirmar-nueva-contraseña"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirmar Nueva Contraseña"
                  />
                </FormControl>
               
                <Button onClick={handlerEnviarContraseña} variant="contained" color='info' size="large" sx={{ borderRadius: '20px', marginTop: '30px' }}>Guardar nueva contraseña</Button>

              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
};


export default CambioContraseña;