import { createSlice } from "@reduxjs/toolkit";

const filterControlValues = {
    genreFilter: [{ label: 'Ambos generos', filter: "genreFilter", index: 0 }, { label: 'Machos', filter: "genreFilter", index: 1 }, { label: 'Hembras', filter: "genreFilter", index: 2 }],
    speciesFilter: [{ label: 'Todas las especies', filter: "speciesFilter", index: 0 }, { label: 'Perros', filter: "speciesFilter", index: 1 }, { label: 'Gatos', filter: "speciesFilter", index: 2 }, { label: 'Otros', filter: "speciesFilter", index: 3 }],
    sizeFilter: [{ label: 'Todos los tamaños', filter: "sizeFilter", index: 0 }, { label: 'Pequeños', filter: "sizeFilter", index: 1 }, { label: 'Medianos', filter: "sizeFilter", index: 2 }, { label: 'Grandes', filter: "sizeFilter", index: 3 }]
}

const initialState = {
    petsData: null,
    pageChunks: [],
    currentPage: 1,
    currentSortMethodIndex: -1,
    currentSortDirection: "Ascending",
    filters: {
        genreFilter: filterControlValues.genreFilter[0],
        speciesFilter: filterControlValues.speciesFilter[0],
        sizeFilter: filterControlValues.sizeFilter[0],
        ageFilter: [0, 30],
        weightFilter: [1, 100]
    }
}

export const adoptionsSlice = createSlice({
    name: "adoptions",
    initialState,
    reducers: {
        setPetsData: (state, action) => {
            state.petsData = action.payload;
        },
        setPageChunks: (state, action) => {
            state.pageChunks = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setCurrentSortMethodIndex: (state, action) => {
            state.currentSortMethodIndex = action.payload;
        },
        setCurrentSortDirection: (state, action) => {
            state.currentSortDirection = action.payload;
        },
        setFilters: (state, action) => {
            state.filters = action.payload;
        }
    }
});

export const { setPetsData, setPageChunks, setCurrentPage, setCurrentSortMethodIndex, setCurrentSortDirection, setFilters } = adoptionsSlice.actions
export default adoptionsSlice.reducer