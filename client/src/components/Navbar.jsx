import { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../assets/image/logo.svg'
import FavoriteIcon from '@mui/icons-material/Favorite';
import Container from '@mui/material/Container'

const drawerWidth = 240;
const navItems = [
  {
    name:'Inicio',
    route:'/'
  }, 
  {
    name:'Quienes Somos',
    route:'/quienes-somos'
  }, 
  {
    name:'Adopciones',
    route:'/adopciones'
  }, 
  {
    name:'Donaciones',
    route:'/donaciones'
  }, 
  {
    name:'Contacto',
    route:'/contacto'
  }
];

const Navbar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{padding:'10px 0px'}}>
        <img className='logo' src={Logo} alt="Logo Huellitas de amor" />
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
              <Button key={item.name} component={RouterLink} to={item.route}>
                {item.name}
              </Button>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <Button component={RouterLink} to="/favoritos">
              Favoritos
          </Button>
        </ListItem>
        <ListItem disablePadding>
          <Button component={RouterLink} to="/iniciar-sesion">
              Iniciar sesion
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Container>
      <Box sx={{ display: 'flex'}}>
        <AppBar position="sticky" component="nav" sx={{boxShadow:'none'}}>
          <Toolbar sx={{background:'#fff',paddingTop:'10px', paddingBottom:'10px'}}>
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              <img className='logo' src={Logo} alt="Logo Huellitas de amor" />
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item) => (
                <Button key={item.name} component={RouterLink} to={item.route}>
                  {item.name}
                </Button>
              ))}
              <Button component={RouterLink} to="/favoritos">
                  <FavoriteIcon/>
              </Button>
              <Button component={RouterLink} to="/iniciar-sesion">
                  Iniciar sesion
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </Box>

      </Box>
    </Container>
  );
}

Navbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Navbar;