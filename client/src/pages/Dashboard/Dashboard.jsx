 import React from 'react';
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
import {  Grid, List, ListItemButton, ListItemIcon} from "@mui/material";
import { Box } from "@mui/system";
import PetsIcon from '@mui/icons-material/Pets';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector } from "react-redux";
import { useEffect } from "react";

const  Dashboard  = (props) => {

    // const currentUser = useSelector((state) => state.users.currentUser);

    // useEffect(() => {

    // }, [currentUser]);

    return <Box sx={{ marginTop:'200px' }}>
        <Grid container spacing={2}>
          
          
            <Grid item md={2}>
                <Box>
              
                        <List>
                            <ListItemButton>
                                <ListItemIcon>
                                    <PetsIcon />
                                </ListItemIcon>
                                Mascotas
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <AccountCircleIcon />
                                </ListItemIcon>
                                Usuarios
                            </ListItemButton>
                        </List>
                  
                </Box>
            </Grid>
            <Grid item md={10}>
               <DataTablePets/>
              <DataTableUsers/>

                {/* <Typography textAlign="center" component="h1" variant="h4" color="primary">
                    {
                        currentUser ? currentUser.name.split(" ")[0] : null
                    }
                </Typography> */}
            </Grid>
        </Grid>
    </Box>
}

export default  Dashboard ;