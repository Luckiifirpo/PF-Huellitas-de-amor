import { createSlice } from "@reduxjs/toolkit";

const filterControlValues = {
    genderFilter: [{ label:'', langKey: 'ambosGeneros', filter: "genderFilter", index: 0 }, { label:'', langKey: 'machos', filter: "genderFilter", index: 1 }, { label:'', langKey: 'hembras', filter: "genderFilter", index: 2 }],
    speciesFilter: [{ label:'', langKey: 'todasLasEspecies', filter: "speciesFilter", index: 0 }, { label:'', langKey: 'perros', filter: "speciesFilter", index: 1 }, { label:'', langKey: 'gatos', filter: "speciesFilter", index: 2 }, { label:'', langKey: 'otros', filter: "speciesFilter", index: 3 }],
    sizeFilter: [{ label:'', langKey: 'todosLosTamaños', filter: "sizeFilter", index: 0 }, { label:'', langKey: 'pequeños', filter: "sizeFilter", index: 1 }, { label:'', langKey: 'medianos', filter: "sizeFilter", index: 2 }, { label:'', langKey: 'grandes', filter: "sizeFilter", index: 3 }]
  }

const initialState = {
    currentPage: 1,
    currentSortMethodIndex: -1,
    currentSortDirection: "Ascending",
    favoritesPets: [],
    filters: {
        genderFilter: filterControlValues.genderFilter[0],
        speciesFilter: filterControlValues.speciesFilter[0],
        sizeFilter: filterControlValues.sizeFilter[0],
        ageFilter: [0, 30],
        weightFilter: [1, 100]
    },
    updatingFiltersAndSort: false,
    isBusy: false,
}

export const adoptionsSlice = createSlice({
    name: "adoptions",
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setCurrentSortMethodIndex: (state, action) => {
            state.currentSortMethodIndex = action.payload;
            state.updatingFiltersAndSort = true;
        },
        setCurrentSortDirection: (state, action) => {
            state.currentSortDirection = action.payload;
            state.updatingFiltersAndSort = true;
        },
        setFilters: (state, action) => {
            state.filters = action.payload;
            state.updatingFiltersAndSort = true;
        },
        tryStartingFavoritesInLocalStorage: () => {
            if (!localStorage.getItem('PetsFavorites')) {
                localStorage.setItem('PetsFavorites', JSON.stringify([]));
            }
        },
        setFavorites: (state, action) => {
            if (state.favoritesPets.some(pet => pet.id === action.payload.id)) return
            state.favoritesPets = [...state.favoritesPets, action.payload];
            localStorage.setItem('PetsFavorites', JSON.stringify(state.favoritesPets))
        },
        getFavorites: (state, action) => {
            state.favoritesPets = JSON.parse(localStorage.getItem('PetsFavorites'))
        },
        deleteFavorite: (state, action) => {
            state.favoritesPets = JSON.parse(localStorage.getItem('PetsFavorites'))
            localStorage.setItem('PetsFavorites', JSON.stringify(state.favoritesPets.filter(e => e.id !== action.payload)))
        },
        resetUpdatingFiltersAndSort: (state) => {
            state.updatingFiltersAndSort = false;
        },
        setAdoptionsBusyMode: (state, action) => {
          state.isBusy = action.payload;
        }
    }
});

export const {setCurrentPage, setCurrentSortMethodIndex, setCurrentSortDirection, setFilters, resetUpdatingFiltersAndSort, setFavorites, getFavorites, deleteFavorite, tryStartingFavoritesInLocalStorage, setAdoptionsBusyMode } = adoptionsSlice.actions
export default adoptionsSlice.reducer