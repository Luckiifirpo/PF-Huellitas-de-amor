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
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Logo from '../../assets/image/logo.svg'
import FavoriteIcon from '@mui/icons-material/Favorite';
import Container from '@mui/material/Container'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import UserAccountMenu from '../UserAccountMenu/UserAccountMenu';
import { setToGoAfterLogin } from '../../redux/slices/navigationSlice';
import LangMenu from '../LangMenu/LangMenu';
import Badge from '@mui/material/Badge';
import {Link} from "react-router-dom"


const drawerWidth = 240;
const navItems = [
  {
    name: 'inicio',
    route: '/'
  },
  {
    name: 'quienesSomos',
    route: '/quienes-somos'
  },
  {
    name: 'adopciones',
    route: '/adopciones'
  },
  {
    name: 'donaciones',
    route: '/donaciones'
  },
  {
    name: 'contacto',
    route: '/contacto'
  }
];

const Navbar = (props) => {

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentUser = useSelector((state) => state.users.currentUser);
  const lang = useSelector((state) => state.lang.currentLangData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const numberFavorites = useSelector(state => state.adoptions.favoritesPets)
 

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const ToLogin = (event) => {
    dispatch(setToGoAfterLogin("/"));
    navigate("/iniciar-sesion");
  }

  const langButtonClick = (event) => {

  }

  useEffect(() => {

  }, [currentUser, lang]);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ padding: '10px 0px' }}>
        <img className='logo' src={Logo} alt="Logo Huellitas de amor" />
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <Button key={item.name} component={RouterLink} to={item.route}>
              {lang.navbar.links[item.name]}
            </Button>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <Button component={RouterLink} to="/favoritos">
            {/* {lang.navbar.links.inicio} */}
            {lang.navbar.links.favoritos}
          </Button>
        </ListItem>
        <ListItem disablePadding>
          {/* <Button component={RouterLink} to="/iniciar-sesion">
            {lang.navbar.links.iniciarSesion}
          </Button> */}
          {
                currentUser ? <UserAccountMenu userData={currentUser} /> :
                  <Button onClick={ToLogin} >
                    {lang.navbar.links.iniciarSesion}
                  </Button>
              }
        </ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Container>
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed" component="nav" sx={{ boxShadow: 'none', background: '#fff' }}>
          <Toolbar sx={{ background: '#fff', paddingTop: '10px', paddingBottom: '10px', margin: '0px 70px' }}>
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { lg: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm:'flex'},justifyContent:"center",marginTop:{xs:"0px",md:"25px"}}}
            >
              <Link to="/">
              <img className='logo' src={Logo} alt="Logo Huellitas de amor" />
              </Link>
            </Box>
            <Box sx={{ display: { xs: 'none', lg: 'flex' } }}>
              {navItems.map((item) => (
                <Button key={item.name} component={RouterLink} to={item.route}>
                  {lang.navbar.links[item.name]}
                </Button>
              ))}
              <Button component={RouterLink} to="/favoritos">
                <Badge badgeContent={numberFavorites?.length} color="primary">
                  <FavoriteIcon />
                </Badge>
              </Button>
              <LangMenu />
              {
                currentUser ? <UserAccountMenu userData={currentUser} /> :
                  <Button onClick={ToLogin} >
                    {lang.navbar.links.iniciarSesion}
                  </Button>
              }
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
              display: { xs: 'block', lg: 'none' },
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