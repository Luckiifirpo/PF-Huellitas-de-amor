import React from 'react';
import DataTable from '../../components/DataTable/DataTable';
import Container from "@mui/material/Container";



const Dashboard  = () => {
 
  return (
    <div >
        <Container style={{ marginTop: 150, marginBottom: 30 }} >
             <DataTable/>
        </Container>
     
    </div>
  );
}
export default  Dashboard ;