// import { Grid } from '@mui/material'
// import { Container } from '@mui/system'
import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TeamMemberCard from "../../components/TeamMemberCard/TeamMemberCard";

const testingData = [
  {
    id: "0",
    name: "Armando Puertas de las Casas",
    description: "testing description for this component",
    img: "5907.jpg",
  },
  {
    id: "1",
    name: "Zacarías Tierra",
    description: "testing description for this component",
    img: "5907.jpg",
  },
  {
    id: "2",
    name: "Armando Puentes",
    description: "testing description for this component",
    img: "5907.jpg",
  },
  {
    id: "3",
    name: "Carlos Pinta Paredes",
    description: "testing description for this component",
    img: "5907.jpg",
  },
  {
    id: "4",
    name: "Consuelo Calvo",
    description: "testing description for this component",
    img: "5907.jpg",
  },
  {
    id: "5",
    name: "Mario Plomero",
    description: "testing description for this component",
    img: "5907.jpg",
  },
  {
    id: "6",
    name: "Andres Posso Ahumado",
    description: "testing description for this component",
    img: "5907.jpg",
  },
  {
    id: "7",
    name: "Martina Perez",
    description: "testing description for this component",
    img: "5907.jpg",
  },
];

const AboutUs = () => {
  return (
    <div>
      <Container style={{ marginTop: 150, marginBottom: 30 }} >
        <Grid
          container
          spacing={2}
          alignItems="flex-start"
        >
          <Grid item md={3}>
            <Typography
              component="h4"
              variant="h4"
              sx={{
                color: "#FF3041",
                textTransform: "uppercase",
                fontWeight: "700",
              }}
            >
              Quienes Somos?
            </Typography>
            <Typography component="p" sx={{ margin: "10px 0px" }}>
              Somos estudiantes de Henry cursando la etapa final del bootcamp
              donde tenemos que desarrollar una aplicación en grupo cumpliendo
              diferentes objetivos propuestos por el bootcamp. Esta aplicación
              web tiene como objetivo conectar personas con posibles mascotas en
              adopción, además de brindar la posibilidad de hacer donaciones
              para mejorar la calidad de vida de las mascotas.
            </Typography>
          </Grid>
          <Grid Grid item md={9}>
            <Grid container spacing={2} alignItems="flex-start">
              {testingData.map((testingData, key) => {
                return (
                  <Grid key={key} item md={4} alignSelf="stretch">
                    <TeamMemberCard data={testingData} />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AboutUs;