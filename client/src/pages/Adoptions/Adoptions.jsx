import { Autocomplete, Box, Button, Card, CardContent, Divider, Grid, List, ListItem, ListItemButton, ListItemText, Pagination, Paper, Slider, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useState } from 'react'
import PetCard from '../../components/PetCard/PetCard'
import Pet_Pagination_Behavior from "./Pet.Pagination"
import Pet_Filters_Behavior from './Pet.Filters';
import style from "./Adoptions.module.css"
import testingPetList from "../../petList.json";
import Pet_Sort_Behavior from './Pet.Sort'
import {useNavigate } from "react-router-dom";

const filterControlValues = {
  genreFilter: [{ label: 'Ambos generos', filter: "genreFilter", index: 0 }, { label: 'Machos', filter: "genreFilter", index: 1 }, { label: 'Hembras', filter: "genreFilter", index: 2 }],
  speciesFilter: [{ label: 'Todas las especies', filter: "speciesFilter", index: 0 }, { label: 'Perros', filter: "speciesFilter", index: 1 }, { label: 'Gatos', filter: "speciesFilter", index: 2 }, { label: 'Otros', filter: "speciesFilter", index: 3 }],
  sizeFilter: [{ label: 'Todos los tamaños', filter: "sizeFilter", index: 0 }, { label: 'Pequeños', filter: "sizeFilter", index: 1 }, { label: 'Medianos', filter: "sizeFilter", index: 2 }, { label: 'Grandes', filter: "sizeFilter", index: 3 }]
}

const Adoptions = () => {

  const page_chunks = Pet_Pagination_Behavior.Apply(testingPetList, 6);
  const [petsData, setPetsData] = React.useState(page_chunks[0]);
  const [pageChunks, setPageChunks] = React.useState(page_chunks);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [localSortMethodIndex, setLocalSortMethodIndex] = React.useState(-1);
  const [localFilters, setLocalFilteRs] = React.useState({
    genreFilter: filterControlValues.genreFilter[0],
    speciesFilter: filterControlValues.speciesFilter[0],
    sizeFilter: filterControlValues.sizeFilter[0],
    ageFilter: [0, 30],
    weightFilter: [1, 100]
  });
  const [localSortDirection, setLocalSortDirection] = React.useState("Ascending");

  const minDistance = 1;

  const adoptionListItemClick = (event, index) => {
    setLocalSortMethodIndex(index);
    apply_filters_and_sort(localFilters, index, localSortDirection);
  };

  const resetSortSettings = (event) => {
    setLocalSortMethodIndex(-1);
  }

  const SetSortDirection = (event, value) => {
    setLocalSortDirection(value);
    apply_filters_and_sort(localFilters, localSortMethodIndex, value);
  }

  const resetAdoptionFilters = (event) => {
    const new_filter_data = {
      genreFilter: filterControlValues.genreFilter[0],
      speciesFilter: filterControlValues.speciesFilter[0],
      sizeFilter: filterControlValues.sizeFilter[0],
      ageFilter: [0, 30],
      weightFilter: [1, 100]
    };

    setLocalFilteRs(new_filter_data);
    apply_filters_and_sort(new_filter_data, localSortMethodIndex, localSortDirection);
  }

  const apply_filters_and_sort = (filters, sort_method_index, sort_direction) => {
    const filtered_pets_data = Pet_Filters_Behavior.Apply(testingPetList, filters);
    const sorted_pets_data = Pet_Sort_Behavior.Apply(filtered_pets_data, sort_method_index, sort_direction);
    create_pagination(sorted_pets_data);
  }

  const create_pagination = (filtered_pets_data) => {
    const pets_page_chunks = Pet_Pagination_Behavior.Apply(filtered_pets_data, 6);
    setPageChunks(pets_page_chunks);
    updatePetsData(pets_page_chunks);
  }

  const updatePetsData = (pets_page_chunks) => {
    if (pets_page_chunks.length) {
      if (currentPage >= pets_page_chunks.length) {
        setPetsData(pets_page_chunks[pets_page_chunks.length - 1]);
        setCurrentPage(pets_page_chunks.length);
      } else {
        setPetsData(pets_page_chunks[currentPage - 1]);
      }
    } else {
      setPetsData([]);
    }
  }

  const AutocompleteFilterOnChange = (event, newValue) => {
    const new_filter_data = {
      ...localFilters,
      [newValue.filter]: newValue
    };

    setLocalFilteRs(new_filter_data);
    apply_filters_and_sort(new_filter_data, localSortMethodIndex, localSortDirection);
  }

  const SliderFilterOnChange = (event, newValue, activeThumb) => {
    const filter = event.target.name;
    let _new_value = newValue;

    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      _new_value = ([Math.min(newValue[0], localFilters[filter][1] - minDistance), localFilters[filter][1]]);
    } else {
      _new_value = ([localFilters[filter][0], Math.max(newValue[1], localFilters[filter][0] + minDistance)]);
    }

    const new_filter_data = {
      ...localFilters,
      [filter]: _new_value
    };

    setLocalFilteRs(new_filter_data);
    apply_filters_and_sort(new_filter_data, localSortMethodIndex, localSortDirection);
  }

  const ChangePage = (event, page) => {
    setCurrentPage(page);
    setPetsData(pageChunks[page - 1]);
  }

  const navigate = useNavigate()
  const  handlerPostAdoption = (e) =>{
    navigate("/dar-en-adopcion")
    }

  return (
    <div>
      <Container style={{ marginBottom: 30, marginTop: 130 }} >
        <Grid container spacing={5} alignItems="flex-start">
          <Grid component={Box} item lg={2} display={{ xs: "none", lg: "block" }} />
          <Grid item lg={8} xs={12}>
            <Grid container alignItems="center" justifyContent="center">
              {
                petsData.length ? <Pagination count={pageChunks.length} page={currentPage} onChange={ChangePage} /> : null
              }
            </Grid>
          </Grid>
          <Grid item lg={2} xs={12} display="flex" justifyContent="center">
            <Button variant="contained" color='info' size="small" sx={{ borderRadius: '20px', paddingLeft: 5, paddingRight: 5 } } onClick={(e) => handlerPostAdoption(e)}>Publicar</Button>
          </Grid>
          <Grid item lg={3} md={4} xs={12}>
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
            <Typography component="h1" style={{ marginTop: 30 }} sx={{ color: '#FF3041', fontWeight: 'Bold' }}>
              ORDENAR POR:
            </Typography>
            <Paper>
              <List>
                <ListItemButton selected={localSortMethodIndex === 0}
                  onClick={(event) => adoptionListItemClick(event, 0)}>
                  <ListItemText primary="TAMAÑO" />
                </ListItemButton>
                <ListItemButton selected={localSortMethodIndex === 1}
                  onClick={(event) => adoptionListItemClick(event, 1)}>
                  <ListItemText primary="EDAD" />
                </ListItemButton>
                <ListItemButton selected={localSortMethodIndex === 2}
                  onClick={(event) => adoptionListItemClick(event, 2)}>
                  <ListItemText primary="PESO" />
                </ListItemButton>
                <Divider />
                <ListItem style={{ display: "flex", justifyContent: "center" }}>
                  <ToggleButtonGroup exclusive value={localSortDirection} onChange={SetSortDirection} size='small'>
                    <ToggleButton style={{ padding: "7px 15px" }} value="Ascending">
                      Ascendente
                    </ToggleButton>
                    <ToggleButton style={{ padding: "7px 15px" }} value="Descending">
                      Descendente
                    </ToggleButton>
                  </ToggleButtonGroup>
                </ListItem>
                <Divider />
                <ListItemButton onClick={resetSortSettings}>
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
                    value={localFilters.genreFilter}
                    sx={{ width: 300 }}
                    options={filterControlValues.genreFilter}
                    renderInput={(params) => <TextField disabled={true} {...params} label="Genero" />}
                    onChange={AutocompleteFilterOnChange}
                  ></Autocomplete>
                </ListItem>
                <ListItem>
                  <Autocomplete size="small" disablePortal
                    id="species-filter"
                    value={localFilters.speciesFilter}
                    sx={{ width: 300 }}
                    options={filterControlValues.speciesFilter}
                    renderInput={(params) => <TextField {...params} label="Especie" />}
                    onChange={AutocompleteFilterOnChange}
                  ></Autocomplete>
                </ListItem>
                <ListItem>
                  <Autocomplete size="small" disablePortal
                    id="size-filter"
                    value={localFilters.sizeFilter}
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
                  <Slider name="ageFilter" min={0} max={30} value={localFilters.ageFilter} disableSwap onChange={SliderFilterOnChange} valueLabelDisplay="auto" />
                </ListItem>
                <ListItem className={style.filter_slider_container} >
                  <Typography variant="body2" color="text.secondary">
                    Peso:
                  </Typography>
                  <Slider name="weightFilter" min={0} max={100} value={localFilters.weightFilter} disableSwap onChange={SliderFilterOnChange} valueLabelDisplay="auto" />
                </ListItem>
                <Divider />
                <ListItemButton onClick={resetAdoptionFilters}>
                  <ListItemText primary="Reiniciar" />
                </ListItemButton>
              </List>
            </Paper>
          </Grid>
          <Grid item lg={9} md={8} xs={12}>
            <Grid container spacing={2} alignItems="flex-start" style={{ minHeight: "500px" }}>
              {
                petsData.length ? petsData.map((petData, key) => {
                  return <Grid key={key} item lg={4} md={6} xs={12} alignSelf="stretch">
                    <PetCard data={petData} />
                  </Grid>
                }) : <div className={style.empty_data_container}>
                  <Typography color="secondary" component="h1" variant="h4" style={{ marginTop: 30 }} sx={{ color: '#FF3041', fontWeight: 'Bold' }}>
                    Ninguna entrada coincide con los filtros seleccionados
                  </Typography>
                </div>
              }
            </Grid>
          </Grid>
        </Grid>
      </Container>

    </div>
  )
}

export default Adoptions