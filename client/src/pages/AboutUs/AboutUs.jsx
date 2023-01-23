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
    name: "Alejandro Palacios Gomez",
    description: "Full Stack Developers",
    img: "../public/perfiles/alejandro.jpg",
    github:"https://github.com/Alexpalagomez1255",
    linkedin:"https://www.linkedin.com/in/alejandro-palacios-6a1292172",
  },
  {
    id: "1",
    name: "Oscar William Burgos Serpa",
    description: "Full Stack Developers",
    img: "../public/perfiles/oscar.jpg",
    github:"https://github.com/Oskarp88",
    linkedin:"https://www.linkedin.com/in/oscar-william-burgos-serpa-009675252",
  },
  {
    id: "2",
    name: "Lereysis Quesada Rojas",
    description: "Full Stack Developers",
    img: "../public/perfiles/lere.png",
    github:"https://github.com/Lereysis",
    linkedin:"https://www.linkedin.com/in/lereysis-quezada-814a2a21a/",
  },
  {
    id: "3",
    name: " Luciano Daniel Firpo",
    description: "Full Stack Developers",
    img: "../public/perfiles/luciano.png",
    github:"https://github.com/Luckiifirpo",
    linkedin:"https://www.linkedin.com/in/firpo-luciano",
  },
  {
    id: "4",
    name: "Nahuel Esteban Grodz",
    description: "Full Stack Developers",
    img: "../public/perfiles/nahu.png",
    github:"https://github.com/Nahuk",
    linkedin:"https://www.linkedin.com/in/nahuel-grodz-059a68250/",
  
  },
  {
    id: "5",
    name: "Walter Martinez",
    description: "Desarrollador full stack y, Licenciado en Diseño y Comunicacion Visial. Siempre en búsqueda de nuevos conocimientos y en mejorar habilidades",
    img: "../public/perfiles/walter.png",
    github:"https://github.com/wal90",
    linkedin:"https://www.linkedin.com/in/walter-martinez-71024529/",
  
  },
  {
    id: "6",
    name: "William Estrada",
    description: "Full Stack Developers",
    img: "../public/perfiles/william.png",
    github:"https://github.com/wcamest",
    linkedin:"https://www.linkedin.com/in/william-camilo-estrada-ochoa-565b42174",
  },
  {
    id: "7",
    name: "Cristian Fernando Frias",
    description: "Full Stack Developers",
    img: "../public/perfiles/fer.png",
    github:"https://github.com/ffernando93",
    linkedin:"https://www.linkedin.com/in/fernando-frias-/",
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