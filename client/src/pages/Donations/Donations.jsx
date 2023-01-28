import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import vacuna from '../../assets/image/vacuna.svg'
import comida from '../../assets/image/comida.svg'
import higiene from '../../assets/image/higiene.svg'
import otros from '../../assets/image/bolso.svg'
import imgDonaciones from '../../assets/image/image_donaciones.png'
import style from './Donations.module.css'
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
=======
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAmountDonation } from '../../redux/slices/petsSlice';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { setToGoAfterLogin } from "../../redux/slices/navigationSlice";
>>>>>>> 8da1656 (fix/client requerido inicio de sesion para ciertas acciones)

const Donations = () => {
  const navigate = useNavigate()
  const lang = useSelector((state) => state.lang.currentLangData);

  const handlerContacto = (e) => {
    navigate("/contacto")
  }

<<<<<<< HEAD
  useEffect(() => {

  }, [lang]);

=======
  const handleChange = (event) => {
    console.log(event)
    dispatch(setAmountDonation(event.target.value))
  }
  /********************** */
  const currentUser = useSelector((state) => state.users.currentUser);
    
  useEffect(() => {
     if (!currentUser) {
       dispatch(setToGoAfterLogin("/donaciones"));
       navigate("/iniciar-sesion");
     }
   }, [currentUser]);
  /********************** */
>>>>>>> 8da1656 (fix/client requerido inicio de sesion para ciertas acciones)
  return (
    <Box>
      <Container>
        <Grid container marginTop={'120px'} spacing={4}     justifyContent="space-between"
  alignItems="flex-start">
          <Grid item md={6} sx={{ marginTop: '20px' }}>
            <Typography
              component="h4"
              variant="h4"
              sx={{
                color: "#FF3041",
                textTransform: "uppercase",
                fontWeight: "700",
                fontSize: '30px'
              }}
            >
              {lang.donaciones.titles.apoyaNuestraCausa}
            </Typography>

            <Paper>
              <nav aria-label="main mailbox folders">
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <img src={vacuna} alt="medicamentos" className={style.image} />
                      </ListItemIcon>
                      <ListItemText primary={lang.donaciones.lists.medicamentos.toUpperCase()} />
                    </ListItemButton>

                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <img src={comida} alt="alimentos" className={style.image} />
                      </ListItemIcon>
                      <ListItemText primary={lang.donaciones.lists.alimentos.toUpperCase()} />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <img src={higiene} alt="higiene" className={style.image} />
                      </ListItemIcon>
                      <ListItemText primary={lang.donaciones.lists.higiene.toUpperCase()} />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <img src={otros} alt="otros" className={style.image} />
                      </ListItemIcon>
                      <ListItemText primary={lang.donaciones.lists.otros.toUpperCase()} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </nav>
              <Divider />

            </Paper>

            <Typography
              component="h4"
              variant="h4"
              sx={{
                color: "#FF3041",
                textTransform: "uppercase",
                fontWeight: "700",
                fontSize: '30px',
                marginTop: '40px'
              }}
            >
              {lang.donaciones.titles.donacionesEInsumos}
            </Typography>

            <Typography component="p" sx={{ margin: '10px 0px' }}>
              {lang.donaciones.paragraphs.donacionesEInsumos}
            </Typography>
            <Button variant="contained" color='info' size="large" sx={{ borderRadius: '20px', margin: '20px 0 80px 0' }} onClick={(e) => handlerContacto(e)}>{lang.donaciones.buttons.contacto}</Button>

          </Grid>
          <Grid item md={6} sx={{ marginBottom: '-10px' }}>
          </Grid>
        </Grid>

      </Container>
      <Container>
        <Grid item md={12} sx={{ marginBottom: '-10px' }}>
          <img src={imgDonaciones} alt='fondo donaciones' className={style.imageD} />
        </Grid>
        <Grid item md={12} sx={{ marginBottom: '-10px' }}>
        </Grid>
      </Container>
    </Box>

  )
}

export default Donations