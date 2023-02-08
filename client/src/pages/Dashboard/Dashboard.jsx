import React, { useState } from 'react';
// import DataTablePets from '../../components/DataTable/DataTablePets';
// import DataTableUsers from '../../components/DataTable/DataTableUsers';

// import Container from "@mui/material/Container";


// import Grid from '@mui/material/Grid'

// import {   List, ListItemButton, ListItemIcon, Paper } from "@mui/material";
// import { Box } from "@mui/system";
// import SettingsIcon from '@mui/icons-material/Settings';
// import FavoriteIcon from '@mui/icons-material/Favorite';




// const Dashboard  = () => {

//   return (
//     <div >
//         <Container style={{ marginTop: 150, marginBottom: 30, display:'flex'}} >

//             <Grid item md={2}>
//                 <Box>
//                     <Paper>
//                         <List>
//                             <ListItemButton>
//                                 <ListItemIcon>
//                                     <SettingsIcon />
//                                 </ListItemIcon>
//                                 Configuracion
//                             </ListItemButton>
//                             <ListItemButton>
//                                 <ListItemIcon>
//                                     <FavoriteIcon />
//                                 </ListItemIcon>
//                                 Favoritos
//                             </ListItemButton>
//                         </List>
//                     </Paper>
//                 </Box>
//             </Grid>







//             <Grid item md={9} >
//               <DataTablePets/>
//              <DataTableUsers/>
//             </Grid>







//         </Container>



//     </div>
//   );
// }
// export default  Dashboard ;

import DataTablePets from '../../components/DataTable/DataTablePets';
import DataTableUsers from '../../components/DataTable/DataTableUsers';
import { Grid, List, ListItemButton, ListItemIcon, } from "@mui/material";
import { Box } from "@mui/system";
import PetsIcon from '@mui/icons-material/Pets';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import { setToGoAfterLogin } from "../../redux/slices/navigationSlice";
import DataTableContactUs from '../../components/DataTable/DataTableContactUs';
import Error404 from "../../pages/Error404/Error404"


const Dashboard = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedIndex, setSelectedIndex] = useState(0);

    
    const selectListItems = (event, index) => {
        setSelectedIndex(index);
    }
    const currentUser = useSelector((state) => state.users.currentUser);

    // useEffect(() => {
    //     if (!currentUser) {
    //       dispatch(setToGoAfterLogin("/dashboard"));
    //       navigate("/iniciar-sesion");
    //     }
    //   }, [currentUser]);

    // if (currentUser) {
    //     if(currentUser.role !== "admin")
    //     navigate("/404")
    //     window.alert("No puedes acceder aquí")
    // }

    const renderTable = () => {
        switch(selectedIndex){
            case 0:
                return <DataTablePets />
            case 1:
                return <DataTableUsers />
            case 2:
                return <DataTableContactUs />
        }
    }

    return <Box sx={{ marginTop: '200px' }}>
        {currentUser?.role === "admin" ? 
        <Grid container spacing={2}>
            <Grid item md={2}>
                <Box>

                    <List>
                        <ListItemButton selected={selectedIndex === 0} onClick={(event) => selectListItems(event, 0)}>
                            <ListItemIcon>
                                <PetsIcon />
                            </ListItemIcon>
                            Mascotas
                        </ListItemButton>
                        <ListItemButton selected={selectedIndex === 1} onClick={(event) => selectListItems(event, 1)}>
                            <ListItemIcon>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            Usuarios
                        </ListItemButton>
                        <ListItemButton selected={selectedIndex === 2} onClick={(event) => selectListItems(event, 2)}>
                            <ListItemIcon>
                                <ContactMailIcon />
                            </ListItemIcon>
                            Contactanos
                        </ListItemButton>
                    </List>

                </Box>
            </Grid>
            <Grid item md={10}>
                {
                    renderTable()
                }

                {/* <Typography textAlign="center" component="h1" variant="h4" color="primary">
                    {
                        currentUser ? currentUser.name.split(" ")[0] : null
                    }
                </Typography> */}
            </Grid>    
        </Grid>
        :
        <Error404 />}
    </Box>
}

export default Dashboard;