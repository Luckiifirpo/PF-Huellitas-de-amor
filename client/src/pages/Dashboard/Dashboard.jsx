import React from 'react';
import DataTablePets from '../../components/DataTable/DataTablePets';
import DataTableUsers from '../../components/DataTable/DataTableUsers';

import Container from "@mui/material/Container";



const Dashboard  = () => {
 
  return (
    <div >
        <Container style={{ marginTop: 150, marginBottom: 30 }} >
             <DataTablePets/>
             <DataTableUsers/>
        </Container>
     
    </div>
  );
}
export default  Dashboard ;