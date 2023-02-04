import { Autocomplete, Box, Button, Card, CardContent, Divider, Grid, List, ListItem, ListItemButton, ListItemText, Pagination, Paper, Slider, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useState } from 'react'
import PetCard from '../../components/PetCard/PetCard'
import Pet_Filters_Behavior from './Pet.Filters';
import style from "./Adoptions.module.css"
import Pet_Sort_Behavior from './Pet.Sort'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage, setCurrentSortMethodIndex, setCurrentSortDirection, setFilters, resetUpdatingFiltersAndSort } from '../../redux/slices/adoptionSlice'
import { getAllPets } from "../../redux/slices/petsSlice";
import { useEffect } from 'react'
import _ from "lodash";
import CardViewer from '../../components/CardViewer/CardViewer'

const filterControlValues = {
  genderFilter: [{ label: '', langKey: 'ambosGeneros', filter: "genderFilter", index: 0 }, { label: '', langKey: 'machos', filter: "genderFilter", index: 1 }, { label: '', langKey: 'hembras', filter: "genderFilter", index: 2 }],
  speciesFilter: [{ label: '', langKey: 'todasLasEspecies', filter: "speciesFilter", index: 0 }, { label: '', langKey: 'perros', filter: "speciesFilter", index: 1 }, { label: '', langKey: 'gatos', filter: "speciesFilter", index: 2 }, { label: '', langKey: 'otros', filter: "speciesFilter", index: 3 }],
  sizeFilter: [{ label: '', langKey: 'todosLosTamaños', filter: "sizeFilter", index: 0 }, { label: '', langKey: 'pequeños', filter: "sizeFilter", index: 1 }, { label: '', langKey: 'medianos', filter: "sizeFilter", index: 2 }, { label: '', langKey: 'grandes', filter: "sizeFilter", index: 3 }]
}

const Adoptions = () => {

  const dispatch = useDispatch();
  const [pets_data, set_pets_data] = useState([]);
  const petsList = useSelector((state) => state.pets.petsList);
  const globalState = useSelector((state) => state.adoptions);
  const lang = useSelector((state) => state.lang.currentLangData);
  const minDistance = 1;

  var isArrayEqual = function (x, y) {
    return _(x).differenceWith(y, _.isEqual).isEmpty();
  }

  const adoptionListItemClick = (event, index) => {
    dispatch(setCurrentSortMethodIndex(index));
    apply_filters_and_sort(globalState.filters, index, globalState.currentSortDirection);
  };

  const resetSortSettings = (event) => {
    dispatch(setCurrentSortMethodIndex(-1));
    dispatch(setCurrentSortDirection("Ascending"));
    apply_filters_and_sort(globalState.filters, -1, "Ascending");
  }

  const SetSortDirection = (event, value) => {
    dispatch(setCurrentSortDirection(value));
    apply_filters_and_sort(globalState.filters, globalState.currentSortMethodIndex, value);
  }

  const resetAdoptionFilters = (event) => {
    const new_filter_data = {
      genderFilter: filterControlValues.genderFilter[0],
      speciesFilter: filterControlValues.speciesFilter[0],
      sizeFilter: filterControlValues.sizeFilter[0],
      ageFilter: [0, 30],
      weightFilter: [1, 100]
    };

    dispatch(setFilters(new_filter_data));
    apply_filters_and_sort(new_filter_data, globalState.currentSortMethodIndex, globalState.currentSortDirection);
  }

  const apply_filters_and_sort = (filters, sort_method_index, sort_direction) => {
    const filtered_pets_data = Pet_Filters_Behavior.Apply(petsList, filters);
    const sorted_pets_data = Pet_Sort_Behavior.Apply(filtered_pets_data, sort_method_index, sort_direction);

    if (sorted_pets_data.length !== pets_data.length || !isArrayEqual(sorted_pets_data, pets_data)) {
      set_pets_data(sorted_pets_data);
    }
    //create_pagination(sorted_pets_data);
  }

  /*const create_pagination = (filtered_pets_data) => {
    const pets_page_chunks = Pet_Pagination_Behavior.Apply(filtered_pets_data, 6);
    dispatch(setPageChunks(pets_page_chunks));
    updatePetsData(pets_page_chunks);
  }*/

  const updatePetsData = (pets_page_chunks) => {
    if (pets_page_chunks.length) {
      if (globalState.currentPage >= pets_page_chunks.length) {
        dispatch(setPetsData(pets_page_chunks[pets_page_chunks.length - 1]));
        dispatch(setCurrentPage(pets_page_chunks.length));
      } else {
        dispatch(setPetsData(pets_page_chunks[globalState.currentPage - 1]));
      }
    } else {
      dispatch(setPetsData([]));
    }
  }

  const AutocompleteFilterOnChange = (event, newValue) => {
    const new_filter_data = {
      ...globalState.filters,
      [newValue.filter]: newValue
    };

    dispatch(setFilters(new_filter_data));
    apply_filters_and_sort(new_filter_data, globalState.currentSortMethodIndex, globalState.currentSortDirection);
  }

  const SliderFilterOnChange = (event, newValue, activeThumb) => {
    const filter = event.target.name;
    let _new_value = newValue;

    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      _new_value = ([Math.min(newValue[0], globalState.filters[filter][1] - minDistance), globalState.filters[filter][1]]);
    } else {
      _new_value = ([globalState.filters[filter][0], Math.max(newValue[1], globalState.filters[filter][0] + minDistance)]);
    }

    const new_filter_data = {
      ...globalState.filters,
      [filter]: _new_value
    };

    dispatch(setFilters(new_filter_data));
    apply_filters_and_sort(new_filter_data, globalState.currentSortMethodIndex, globalState.currentSortDirection);
  }

  const ChangePage = (page) => {
    dispatch(setCurrentPage(page));
  }

  const navigate = useNavigate()
  const handlerPostAdoption = (e) => {
    navigate("/dar-en-adopcion")
  }

  const getFiltersInCurrentLang = () => {
    const filtersInCurrentLang = {
      genderFilter: filterControlValues.genderFilter.map(e => {
        return {
          ...e,
          label: lang.adoptions.filtros.genero[e.langKey]
        }
      }),
      speciesFilter: filterControlValues.speciesFilter.map(e => {
        return {
          ...e,
          label: lang.adoptions.filtros.especies[e.langKey]
        }
      }),
      sizeFilter: filterControlValues.sizeFilter.map(e => {
        return {
          ...e,
          label: lang.adoptions.filtros.tamaños[e.langKey]
        }
      })
    }

    return filtersInCurrentLang;
  }

  const getAppliedFiltersInCurrentLang = () => {
    const filtersInCurrentLang = {
      genderFilter: globalState.filters,
      speciesFilter,
      sizeFilter
    }
  }

  useEffect(() => {
    if (petsList) {
      const filtered_pets_data = Pet_Filters_Behavior.Apply(petsList, globalState.filters);
      const sorted_pets_data = Pet_Sort_Behavior.Apply(filtered_pets_data, globalState.currentSortMethodIndex, globalState.currentSortDirection);

      if (pets_data.length !== sorted_pets_data.length || !isArrayEqual(pets_data, sorted_pets_data)) {
        set_pets_data(sorted_pets_data);
      }
    }

  }, [petsList, pets_data, globalState, lang]);


  return (
    <div>
      <Container style={{ marginBottom: 30, marginTop: 130 }} >
        <Grid container spacing={5} alignItems="flex-start">
          <Grid component={Box} item lg={2} display={{ xs: "none", lg: "block" }} />
          <Grid item lg={8} xs={12}>

          </Grid>
          <Grid item lg={2} xs={12} display="flex" justifyContent="center">
            <Button variant="contained" color='yellowButton' size="small" sx={{ borderRadius: '20px', paddingLeft: 5, paddingRight: 5 }} onClick={(e) => handlerPostAdoption(e)}>{lang.adoptions.buttons.publicar}</Button>
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
              {lang.adoptions.titles.adopciones}
            </Typography>
            <Typography component="h1" style={{ marginTop: 30 }} sx={{ color: '#FF3041', fontWeight: 'Bold' }}>
              {lang.adoptions.titles.ordenarPor + ":"}
            </Typography>
            <Paper>
              <List>
                <ListItemButton selected={globalState.currentSortMethodIndex === 0}
                  onClick={(event) => adoptionListItemClick(event, 0)}>
                  <ListItemText primary={lang.adoptions.ordenamientos.tamaño.toUpperCase()} />
                </ListItemButton>
                <ListItemButton selected={globalState.currentSortMethodIndex === 1}
                  onClick={(event) => adoptionListItemClick(event, 1)}>
                  <ListItemText primary={lang.adoptions.ordenamientos.edad.toUpperCase()} />
                </ListItemButton>
                <ListItemButton selected={globalState.currentSortMethodIndex === 2}
                  onClick={(event) => adoptionListItemClick(event, 2)}>
                  <ListItemText primary={lang.adoptions.ordenamientos.peso.toUpperCase()} />
                </ListItemButton>
                <Divider />
                <ListItem style={{ display: "flex", justifyContent: "center" }}>
                  <ToggleButtonGroup exclusive value={globalState.currentSortDirection} onChange={SetSortDirection} size='small'>
                    <ToggleButton style={{ padding: "7px 15px" }} value="Ascending">
                      {lang.adoptions.ordenamientos.ascendente}
                    </ToggleButton>
                    <ToggleButton style={{ padding: "7px 15px" }} value="Descending">
                      {lang.adoptions.ordenamientos.descendente.toUpperCase()}
                    </ToggleButton>
                  </ToggleButtonGroup>
                </ListItem>
                <Divider />
                <ListItemButton onClick={resetSortSettings}>
                  <ListItemText primary={lang.adoptions.ordenamientos.reiniciar} />
                </ListItemButton>
              </List>
            </Paper>
            <Typography component="h1" style={{ marginTop: 30 }} sx={{ color: '#FF3041', fontWeight: 'Bold' }}>
              {lang.adoptions.titles.filtrarPor + ":"}
            </Typography>
            <Paper>
              <List>
                <ListItem>
                  <Autocomplete size="small" disablePortal
                    id="gender-filter"
                    value={lang.adoptions.filtros.genero[globalState.filters.genderFilter.langKey]}
                    sx={{ width: 300 }}
                    options={getFiltersInCurrentLang().genderFilter}
                    renderInput={(params) => <TextField {...params} label={lang.adoptions.filtros.inputs.genero} />}
                    onChange={AutocompleteFilterOnChange}
                    isOptionEqualToValue={(option, value) => {
                      return option.label === value;
                    }}
                  ></Autocomplete>
                </ListItem>
                <ListItem>
                  <Autocomplete size="small" disablePortal
                    id="species-filter"
                    value={lang.adoptions.filtros.especies[globalState.filters.speciesFilter.langKey]}
                    sx={{ width: 300 }}
                    options={getFiltersInCurrentLang().speciesFilter}
                    renderInput={(params) => <TextField {...params} label={lang.adoptions.filtros.inputs.especie} />}
                    onChange={AutocompleteFilterOnChange}
                    isOptionEqualToValue={(option, value) => {
                      return option.label === value;
                    }}
                  ></Autocomplete>
                </ListItem>
                <ListItem>
                  <Autocomplete size="small" disablePortal
                    id="size-filter"
                    value={lang.adoptions.filtros.tamaños[globalState.filters.sizeFilter.langKey]}
                    sx={{ width: 300 }}
                    options={getFiltersInCurrentLang().sizeFilter}
                    renderInput={(params) => <TextField {...params} label={lang.adoptions.filtros.inputs.tamaño} />}
                    onChange={AutocompleteFilterOnChange}
                    isOptionEqualToValue={(option, value) => {
                      return option.label === value;
                    }}
                  ></Autocomplete>
                </ListItem>
                <ListItem className={style.filter_slider_container} >
                  <Typography variant="body2" color="text.secondary">
                    {lang.adoptions.filtros.edad}:
                  </Typography>
                  <Slider name="ageFilter" min={0} max={30} value={globalState.filters.ageFilter} disableSwap onChange={SliderFilterOnChange} valueLabelDisplay="auto" />
                </ListItem>
                <ListItem className={style.filter_slider_container} >
                  <Typography variant="body2" color="text.secondary">
                  {lang.adoptions.filtros.peso}:
                  </Typography>
                  <Slider name="weightFilter" min={0} max={100} value={globalState.filters.weightFilter} disableSwap onChange={SliderFilterOnChange} valueLabelDisplay="auto" />
                </ListItem>
                <Divider />
                <ListItemButton onClick={resetAdoptionFilters}>
                  <ListItemText primary={lang.adoptions.filtros.reiniciar} />
                </ListItemButton>
              </List>
            </Paper>
          </Grid>
          <Grid item lg={9} md={8} xs={12}>
            <CardViewer modeAction={true} cardType="pet_card" cardsDataList={pets_data} currentPage={globalState.currentPage} onChangePage={ChangePage} emptyListLabel={lang.adoptions.listaVacia} />
          </Grid>
        </Grid>
      </Container>

    </div>
  )
}

export default Adoptions