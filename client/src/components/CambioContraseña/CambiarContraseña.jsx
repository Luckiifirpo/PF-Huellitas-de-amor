
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
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { async } from '@firebase/util'
import { FilledInput, FormControl, IconButton, InputAdornment, InputLabel } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { setUserBusyMode, setUserError, setUserMessage } from '../../redux/slices/userSlice'
import ErrorManager from '../../resources/ErrorManager'
import { useEffect } from 'react'
import { setToGoAfterLogin } from '../../redux/slices/navigationSlice'
import { useNavigate } from 'react-router-dom'

const CambioContraseña = () => {

  const [passowrdConfig, setPassWordConfig] = useState({ oldPassword: null, newPassword: null, repeatedNewPassword: null })
  const currentUser = useSelector((state) => state.users.currentUser);
  const loginType = useSelector((state) => state.users.loginType);
  const lang = useSelector((state) => state.lang.currentLangData);

  const [showPreviousPassword, setShowPreviousPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showRepeatedNewPassword, setShowRepeatedNewPassword] = useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

      try {
        dispatch(setUserBusyMode(true));
        const response = await api.put("/users/user_password/" + currentUser.id, passowrdConfig);
        dispatch(setUserBusyMode(false));
        dispatch(setUserMessage({
          title: "Actualizacion completada",
          message: "Se han actualizado tus datos de usuario correctamente",
          details: []
        }))
        navigate("/")

      } catch (error) {
        dispatch(setUserBusyMode(false));
        if (error.response.data.code) {
          const change_password_error_code = error.response.data.code;
          switch (change_password_error_code) {
            case "OldPasswordNotMatch":
            case "RepeatedPasswordNotMatch":
              dispatch(setUserError(ErrorManager.CreateErrorInfoObject({
                name: "ChangingPasswordError",
                code: change_password_error_code
              }, [])));
              break;
          }
        } else {
          dispatch(setUserError(ErrorManager.CreateErrorInfoObject(error, [
            { code: error.code },
            { request: "POST: http://localhost:3001/users//user_info/:user_id" }
          ])));
        }
      }
    }
  }

  const handleClickShowPreviousPassword = () => setShowPreviousPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickshowRepeatedNewPassword = () => setShowRepeatedNewPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (!currentUser) {
      dispatch(setToGoAfterLogin("/cambio-contraseña"));
      navigate("/iniciar-sesion");
    } else if (currentUser && loginType !== "withEmailAndPassword") {
      navigate("/");
    }
  }, [currentUser]);

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
                  {lang.cambiarContraseña.title}
                </Typography>
                <Typography component="h4" variant="h6" align='center' sx={{ color: '#FF3055', fontWeight: '700' }}>
                  {lang.cambiarContraseña.subtitle}
                </Typography>
                <FormControl sx={{ m: 1 }} variant="outlined">
                  <InputLabel htmlFor="contraseña-anterior">{lang.cambiarContraseña.inputs.contraseñaAnterior}</InputLabel>
                  <FilledInput
                    onChange={handlerContraseñaAnterior}
                    id="contraseña-anterior"
                    type={showPreviousPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPreviousPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPreviousPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Contraseña Anterior"
                  />
                </FormControl>
                <FormControl sx={{ m: 1 }} variant="outlined">
                  <InputLabel htmlFor="nueva-contraseña">{lang.cambiarContraseña.inputs.nuevaContraseña}</InputLabel>
                  <FilledInput
                    onChange={handlerNuevaContraseña}
                    id="nueva-contraseña"
                    type={showNewPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowNewPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showNewPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Nueva Contraseña"
                  />
                </FormControl>
                <FormControl sx={{ m: 1 }} variant="outlined">
                  <InputLabel htmlFor="confirmar-nueva-contraseña">{lang.cambiarContraseña.inputs.confirmarContraseña}</InputLabel>
                  <FilledInput
                    onChange={handlerRepetirContraseña}
                    id="confirmar-nueva-contraseña"
                    type={showRepeatedNewPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickshowRepeatedNewPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showRepeatedNewPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirmar Nueva Contraseña"
                  />
                </FormControl>

                <Button onClick={handlerEnviarContraseña} variant="contained" color='info' size="large" sx={{ borderRadius: '20px', marginTop: '30px' }}>{lang.cambiarContraseña.button.guardarContraseña}</Button>

              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
};


export default CambioContraseña;
