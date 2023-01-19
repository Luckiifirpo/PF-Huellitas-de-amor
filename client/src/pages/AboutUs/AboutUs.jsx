import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const AboutUs = () => {
  return (
    <>
      <Container>
        <Grid container spacing={2} alignItems="center">
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
            
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AboutUs;
