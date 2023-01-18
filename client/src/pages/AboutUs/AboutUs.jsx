import { Grid } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import TeamMemberCard from '../../components/TeamMemberCard/TeamMemberCard'

const testingData = {
  id: "0",
  name: "Armando Puertas de las Casas",
  description: "testing description for this component",
  img: "5907.jpg"
}

const AboutUs = () => {
  return (
    <div>
      <Container >
        <Grid container spacing={2} alignItems="center">
          <Grid item md={4}>
            <TeamMemberCard data={testingData} />
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default AboutUs