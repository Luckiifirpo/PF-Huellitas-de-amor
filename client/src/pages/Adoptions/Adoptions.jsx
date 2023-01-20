import { Autocomplete, Button, Card, CardContent, Divider, Grid, List, ListItem, ListItemButton, ListItemText, Pagination, Paper, Slider, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useState } from 'react'
import PetCard from '../../components/PetCard/PetCard'
import Pet_Filters_Behavior from './Pet.Filters';
import style from "./Adoptions.module.css"

const testingPetList = [
  {
    "id": "1",
    "date": "1-Jan-2023",
    "species": "Dog",
    "name": "Rex",
    "age": "2yrs",
    "weight": "25kg",
    "size": "Big",
    "genre": "Male",
    "breed": "Cacri",
    "description": "Its a black lovely dog, who likes to play with kids",
    "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxZJlbDtw4byJKcug1ME7qlpG1jet3tHg1zA&usqp=CAU"
  }, {
    "id": "2",
    "date": "6-Jan-2023",
    "species": "Dog",
    "name": "princess",
    "age": "8yrs",
    "weight": "10kg",
    "size": "medium",
    "genre": "female",
    "breed": "Spaniel",
    "description": "Beautiful grandma dog XD, its a great company for people and loves to be pet",
    "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiEwsd1j4JLO9RoDf1e5DJOyRzJ6MHHC-sHpoD-i0DFjiQER8KvxTD7ZAbAQiKnOEpB4c&usqp=CAU"
  }, {
    "id": "3",
    "date": "6-dec-2022",
    "species": "Cat",
    "name": "gato",
    "age": "1 yr",
    "weight": "10kg",
    "size": "medium",
    "genre": "male",
    "breed": "orange",
    "description": "lovely cat, likes to spend his time on you, you cant until his willing",
    "img": "https://imagenes.muyinteresante.es/files/vertical_composte_image/uploads/2022/10/12/63468940d3974.jpeg"
  }, {
    "id": "4",
    "date": "22-oct-2022",
    "species": "Dog",
    "name": "Good boy",
    "age": "3 yr",
    "weight": "8kg",
    "size": "small",
    "genre": "male",
    "breed": "White",
    "description": "lovely dog, obeys every order you give to him",
    "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxZJlbDtw4byJKcug1ME7qlpG1jet3tHg1zA&usqp=CAU"
  }, {
    "id": "5",
    "date": "15-jan-2023",
    "species": "Cat",
    "name": "mickey",
    "age": "3 months",
    "weight": "1kg",
    "size": "small",
    "genre": "male",
    "breed": "black",
    "description": "he is like a ninja cat, in the night you only see his big yellow eyes",
    "img": "https://img.freepik.com/fotos-premium/pequeno-gatito-negro-que-sienta-cerca-pared-casa_199743-10497.jpg?w=360"
  }, {
    "id": "6",
    "date": "7-nov-2022",
    "species": "Cat",
    "name": "gato",
    "age": "1 yr",
    "weight": "10kg",
    "size": "medium",
    "genre": "male",
    "breed": "orange",
    "description": "lovely cat, likes to spend his time on you, you cant until his willing",
    "img": "https://imagenes.muyinteresante.es/files/vertical_composte_image/uploads/2022/10/12/63468940d3974.jpeg"
  }

]

const filterControlValues = {
  genreFilter: [{ label: 'Ambos generos', filter: "genreFilter", index: 0 }, { label: 'Machos', filter: "genreFilter", index: 1 }, { label: 'Hembras', filter: "genreFilter", index: 2 }],
  speciesFilter: [{ label: 'Todas las especies', filter: "speciesFilter", index: 0 }, { label: 'Perros', filter: "speciesFilter", index: 1 }, { label: 'Gatos', filter: "speciesFilter", index: 2 }, { label: 'Otros', filter: "speciesFilter", index: 3 }],
  sizeFilter: [{ label: 'Todos los tamaños', filter: "sizeFilter", index: 0 }, { label: 'Pequeños', filter: "sizeFilter", index: 1 }, { label: 'Medianos', filter: "sizeFilter", index: 2 }, { label: 'Grandes', filter: "sizeFilter", index: 3 }]
}

const Adoptions = () => {

  const [petsData, setPetsData] = React.useState(testingPetList);
  const [selectedAdoptionSortIndex, setSelectedAdoptionSortIndex] = React.useState(-1);
  const [localFilterState, setLocalFilterState] = React.useState({
    genreFilter: filterControlValues.genreFilter[0],
    speciesFilter: filterControlValues.speciesFilter[0],
    sizeFilter: filterControlValues.sizeFilter[0],
    ageFilter: [0, 30],
    weightFilter: [1, 100]
  });

  const adoptionListItemClick = (event, index) => {
    setSelectedAdoptionSortIndex(index);
  };

  const resetAdoptionSortIndex = (event) => {
    setSelectedAdoptionSortIndex(-1);
  }

  const resetAdoptionFilters = (event) => {
    const new_filter_data = {
      genreFilter: filterControlValues.genreFilter[0],
      speciesFilter: filterControlValues.speciesFilter[0],
      sizeFilter: filterControlValues.sizeFilter[0],
      ageFilter: [0, 30],
      weightFilter: [1, 100]
    };

    setLocalFilterState(new_filter_data);

    const filtered_pets_data = Pet_Filters_Behavior.Apply(testingPetList, new_filter_data);
    setPetsData(filtered_pets_data);
  }

  const AutocompleteFilterOnChange = (event, newValue) => {
    const new_filter_data = {
      ...localFilterState,
      [newValue.filter]: newValue
    };

    setLocalFilterState(new_filter_data);
    const filtered_pets_data = Pet_Filters_Behavior.Apply(testingPetList, new_filter_data);
    setPetsData(filtered_pets_data);
  }

  const minDistance = 1;
  function valuetext(value) {
    return `${value}`;
  }

  const SliderFilterOnChange = (event, newValue, activeThumb) => {
    const filter = event.target.name;
    let _new_value = newValue;

    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      _new_value = ([Math.min(newValue[0], localFilterState[filter][1] - minDistance), localFilterState[filter][1]]);
    } else {
      _new_value = ([localFilterState[filter][0], Math.max(newValue[1], localFilterState[filter][0] + minDistance)]);
    }

    const new_filter_data = {
      ...localFilterState,
      [filter]: _new_value
    };

    setLocalFilterState(new_filter_data);
    const filtered_pets_data = Pet_Filters_Behavior.Apply(testingPetList, new_filter_data);
    setPetsData(filtered_pets_data);
  }

  return (
    <div>
      <Container style={{ marginBottom: 30 }} >
        <Grid container spacing={5} alignItems="flex-start">
          <Grid item lg={10}>
            <Grid container alignItems="center" justifyContent="center">
              <Pagination style={{ marginLeft: 300 }} count={10} />
            </Grid>
          </Grid>
          <Grid item lg={2}>
            <Button variant="contained" color='info' size="small" sx={{ borderRadius: '20px', paddingLeft: 5, paddingRight: 5}}>Publicar</Button>
          </Grid>
          <Grid item lg={3}>
            <Typography
              component="h4"
              variant="h4"
              sx={{
                color: "#FF3041",
                textTransform: "uppercase",
                fontWeight: "700",
              }}
            >
              Adopciones
            </Typography>
            <Paper>
              <List>
                <ListItemButton selected={selectedAdoptionSortIndex === 0}
                  onClick={(event) => adoptionListItemClick(event, 0)}>
                  <ListItemText primary="POR TAMAÑO" />
                </ListItemButton>
                <ListItemButton selected={selectedAdoptionSortIndex === 1}
                  onClick={(event) => adoptionListItemClick(event, 1)}>
                  <ListItemText primary="POR EDAD" />
                </ListItemButton>
                <ListItemButton selected={selectedAdoptionSortIndex === 2}
                  onClick={(event) => adoptionListItemClick(event, 2)}>
                  <ListItemText primary="POR PESO" />
                </ListItemButton>
                <Divider />
                <ListItemButton onClick={resetAdoptionSortIndex}>
                  <ListItemText primary="Reiniciar" />
                </ListItemButton>
              </List>
            </Paper>
            <Typography component="h1" style={{ marginTop: 30 }} sx={{ color: '#FF3041', fontWeight: 'Bold' }}>
              FILTRAR POR:
            </Typography>
            <Paper>
              <List>
                <ListItem>
                  <Autocomplete size="small" disablePortal
                    id="genre-filter"
                    value={localFilterState.genreFilter}
                    sx={{ width: 300 }}
                    options={filterControlValues.genreFilter}
                    renderInput={(params) => <TextField disabled={true} {...params} label="Genero" />}
                    onChange={AutocompleteFilterOnChange}
                  ></Autocomplete>
                </ListItem>
                <ListItem>
                  <Autocomplete size="small" disablePortal
                    id="species-filter"
                    value={localFilterState.speciesFilter}
                    sx={{ width: 300 }}
                    options={filterControlValues.speciesFilter}
                    renderInput={(params) => <TextField {...params} label="Especie" />}
                    onChange={AutocompleteFilterOnChange}
                  ></Autocomplete>
                </ListItem>
                <ListItem>
                  <Autocomplete size="small" disablePortal
                    id="size-filter"
                    value={localFilterState.sizeFilter}
                    sx={{ width: 300 }}
                    options={filterControlValues.sizeFilter}
                    renderInput={(params) => <TextField {...params} label="Tamaños" />}
                    onChange={AutocompleteFilterOnChange}
                  ></Autocomplete>
                </ListItem>
                <ListItem className={style.filter_slider_container} >
                  <Typography variant="body2" color="text.secondary">
                    Edad:
                  </Typography>
                  <Slider name="ageFilter" min={0} max={30} value={localFilterState.ageFilter} disableSwap onChange={SliderFilterOnChange} valueLabelDisplay="auto" />
                </ListItem>
                <ListItem className={style.filter_slider_container} >
                  <Typography variant="body2" color="text.secondary">
                    Peso:
                  </Typography>
                  <Slider name="weightFilter" min={0} max={100} value={localFilterState.weightFilter} disableSwap onChange={SliderFilterOnChange} valueLabelDisplay="auto" />
                </ListItem>
                <Divider />
                <ListItemButton onClick={resetAdoptionFilters}>
                  <ListItemText primary="Reiniciar" />
                </ListItemButton>
              </List>
            </Paper>
          </Grid>
          <Grid item lg={9}>
            <Grid container spacing={2} alignItems="flex-start">
              {
                petsData.map((petData, key) => {
                  return <Grid key={key} item md={4} alignSelf="stretch">
                    <PetCard data={petData} />
                  </Grid>
                })
              }
            </Grid>
          </Grid>
        </Grid>
      </Container>

    </div>
  )
}

export default Adoptions