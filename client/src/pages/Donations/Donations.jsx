import React from 'react';
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
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAmountDonation } from '../../redux/slices/petsSlice';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { setToGoAfterLogin } from "../../redux/slices/navigationSlice";

const Donations = () => {
  const navigate = useNavigate()
  const handlerContacto = (e) => {
    navigate("/contacto")
  }
  const dispatch = useDispatch()

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
              si deseas apoyar nuestra causa
            </Typography>

            <Paper>
              <nav aria-label="main mailbox folders">
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <img src={vacuna} alt="medicamentos" className={style.image} />
                      </ListItemIcon>
                      <ListItemText primary="MEDICAMENTOS" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <img src={comida} alt="alimentos" className={style.image} />
                      </ListItemIcon>
                      <ListItemText primary="ALIMENTOS" />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <img src={higiene} alt="higiene" className={style.image} />
                      </ListItemIcon>
                      <ListItemText primary="HIGIENE" />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <img src={otros} alt="otros" className={style.image} />
                      </ListItemIcon>
                      <ListItemText primary="OTROS" />
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
              donaciones de insumos
            </Typography>

            <Typography component="p" sx={{ margin: '10px 0px' }}>
              Si quieres realizar una donación de insumos (comida para perros, elementos de aseo, camas, cobijas, medicinas, etc) puedes ponerte en contacto con nosotros.
            </Typography>
            <Button variant="contained" color='info' size="large" sx={{ borderRadius: '20px', margin: '20px 0 80px 0' }} onClick={(e) => handlerContacto(e)}>contacto</Button>

          </Grid>
          <Grid item md={5} 
            sx={{
              backgroundColor:'#fff',
              borderRadius: '.45rem',
              padding:'32px',
              webkitBoxShadow: '5px 5px 29px -12px rgba(0,0,0,0.52)',
              mozBoxShadow: '5px 5px 29px -12px rgba(0,0,0,0.52)',
              boxShadow:' 5px 5px 29px -12px rgba(0,0,0,0.52)'}}>
          <Typography
              component="h5"
              variant="h2"
              sx={{
                color:'#252525',
                textTransform: "uppercase",
                fontWeight: "700",
                fontSize: '20px',
              }}
            >
              Ingresa el Monto de Tu Donación
          </Typography>
            <Box
              sx={{display:'flex', flexDirection:'column', gap:'10px', marginTop:'10px'}}
            >
              <InputLabel id="demo-simple-select-label">Selecciona un Monto</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Selecciona"
                    onChange={handleChange}
                  >
                    <MenuItem value={1000}>10$</MenuItem>
                    <MenuItem value={2000}>20$</MenuItem>
                    <MenuItem value={3000}>30$</MenuItem>
                    <MenuItem value={5000}>50$</MenuItem>
                    <MenuItem value={10000}>100$</MenuItem>
                  </Select>
              <Button component={Link} to="/stripe" variant="contained" sx={{textDecoration:'none'}}>Ir a Pagar</Button>
            </Box>
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