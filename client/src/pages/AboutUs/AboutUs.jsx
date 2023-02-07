// import { Grid } from '@mui/material'
// import { Container } from '@mui/system'
import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardViewer from "../../components/CardViewer/CardViewer";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../redux/slices/aboutUsSlice";
import { useEffect } from "react";

import alejandro from "../../assets/image/perfiles/alejandro.jpg";
import fernando from "../../assets/image/perfiles/fer.png";
import lereysis from "../../assets/image/perfiles/lere.png";
import luciano from "../../assets/image/perfiles/luciano.png";
import nahuel from "../../assets/image/perfiles/nahu.png";
import oscar from "../../assets/image/perfiles/oscar.jpg";
import walter from "../../assets/image/perfiles/walter.png";
import william from "../../assets/image/perfiles/william.png";

const testingData = [
  {
    id: "0",
    name: "Alejandro Palacios Gomez",
    description: "Full Stack Developers",
    img: alejandro,
    github: "https://github.com/Alexpalagomez1255",
    linkedin: "https://www.linkedin.com/in/alejandro-palacios-6a1292172",
  },
  {
    id: "1",
    name: "Oscar William Burgos Serpa",
    description: "Full Stack Developers",
    img: oscar,
    github: "https://github.com/Oskarp88",
    linkedin: "https://www.linkedin.com/in/oscar-william-burgos-serpa-009675252",
  },
  {
    id: "2",
    name: "Lereysis Quezada Rojas",
    description: "Full Stack Developers",
    img: lereysis,
    github: "https://github.com/Lereysis",
    linkedin: "https://www.linkedin.com/in/lereysis-quezada-814a2a21a/",
  },
  {
    id: "3",
    name: " Luciano Daniel Firpo",
    description: "Full Stack Developers",
    img: luciano,
    github: "https://github.com/Luckiifirpo",
    linkedin: "https://www.linkedin.com/in/firpo-luciano",
  },
  {
    id: "4",
    name: "Nahuel Esteban Grodz",
    description: "Full Stack Developers",
    img: nahuel,
    github: "https://github.com/Nahuk",
    linkedin: "https://www.linkedin.com/in/nahuel-grodz-059a68250/",

  },
  {
    id: "5",
    name: "Walter Martinez",
    description: "Full Stack Developers",
    img: walter,
    github: "https://github.com/wal90",
    linkedin: "https://www.linkedin.com/in/walter-martinez-71024529/",

  },
  {
    id: "6",
    name: "William Estrada",
    description: "Full Stack Developers",
    img: william,
    github: "https://github.com/wcamest",
    linkedin: "https://www.linkedin.com/in/william-camilo-estrada-ochoa-565b42174",
  },
  {
    id: "7",
    name: "Cristian Fernando Frias",
    description: "Full Stack Developers",
    img: fernando,
    github: "https://github.com/ffernando93",
    linkedin: "https://www.linkedin.com/in/fernando-frias-/",
  },
];

const AboutUs = () => {

  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.aboutUs);
  const lang = useSelector((state) => state.lang.currentLangData);

  const OnChangePage = (page) => {
    dispatch(setCurrentPage(page));
  }

  useEffect(() => {

  }, [globalState, lang]);

  return (
    <div>
      <Container style={{ marginTop: 150, marginBottom: 30 }} >
        <Grid
          container
          spacing={2}
          alignItems="flex-start"
        >
          <Grid item md={3} marginTop={'50px'}>
            <Typography
              component="h4"
              variant="h4"
              sx={{
                color: "#FF3041",
                textTransform: "uppercase",
                fontWeight: "700",
              }}
            >
              {lang.quienesSomos.titles.quienesSomos}
            </Typography>
            <Typography component="p" sx={{ margin: "10px 0px" }}>
              {/* Somos estudiantes de Henry cursando la etapa final del bootcamp
              donde tenemos que desarrollar una aplicación en grupo cumpliendo
              diferentes objetivos propuestos por el bootcamp. Esta aplicación
              web tiene como objetivo conectar personas con posibles mascotas en
              adopción, además de brindar la posibilidad de hacer donaciones
            para mejorar la calidad de vida de las mascotas.*/}
            {lang.quienesSomos.paragraphs.quienesSomos}
            </Typography>
          </Grid>
          <Grid Grid item md={9}>
            <CardViewer cardType="team_member_card" cardsDataList={testingData} currentPage={globalState.currentPage} onChangePage={OnChangePage} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AboutUs;