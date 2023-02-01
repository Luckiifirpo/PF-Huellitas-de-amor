import { createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import ErrorManager from "../../resources/ErrorManager";
import { getDatabase, ref, set } from "firebase/database";

const initialState = {
    petsList: [],
    error: null,
    message: null,
    isBusy: false,
    amountDonation: 0,
}

export const petsSlice = createSlice({
    name: "pets",
    initialState,
    reducers: {
        _postPet(state, action) {
            const obtainedPetData = action.payload;
            const reformedPetData = {
                id: obtainedPetData.id,
                date: obtainedPetData.postDate.replace(/T.*/, ""),
                species: obtainedPetData.species,
                name: obtainedPetData.name,
                age: obtainedPetData.age,
                weight: obtainedPetData.weight,
                size: obtainedPetData.size,
                genre: obtainedPetData.gender,
                breed: obtainedPetData.breed,
                description: obtainedPetData.description,
                img: obtainedPetData.image,
                isAdopted: obtainedPetData.isAdopted,
                ageTime: obtainedPetData.ageTime

            }
            state.petsList.push(reformedPetData);
        },
        _getAllPets(state, action) {
            const allPets = action.payload.map((petData) => {
                const obtainedPetData = petData;
                const reformedPetData = {
                    id: obtainedPetData.id,
                    date: obtainedPetData.postDate.replace(/T.*/, ""),
                    species: obtainedPetData.species,
                    name: obtainedPetData.name,
                    age: obtainedPetData.age,
                    weight: obtainedPetData.weight,
                    size: obtainedPetData.size,
                    genre: obtainedPetData.gender,
                    breed: obtainedPetData.race,
                    description: obtainedPetData.description,
                    img: obtainedPetData.image,
                    isAdopted: obtainedPetData.isAdopted,
                    ageTime: obtainedPetData.ageTime

                }

                return reformedPetData;
            });

            if (allPets.length) {
                state.petsList = allPets;
            }
        },
        setPetsError: (state, action) => {
            state.error = action.payload;
        },
        resetPetsError: (state) => {
            state.error = null
        },
        setPetsMessage: (state, action) => {
            state.message = action.payload;
        },
        resetPetsMessage: (state) => {
            state.message = null
        },
        setPetsBusyMode: (state, action) => {
            state.isBusy = action.payload;
        },
        setAmountDonation: (state, action) => {
            state.amountDonation = action.payload
        },
    }
});

const { _postPet, _getAllPets, } = petsSlice.actions;
export const { setPetsError, resetPetsError, setPetsMessage, resetPetsMessage, setPetsBusyMode, setAmountDonation } = petsSlice.actions;

export default petsSlice.reducer

export const postPet = (obj) => async (dispatch) => {
    try {
        dispatch(setPetsBusyMode(true));
        const response = await api.post("/animals", obj);
        dispatch(setPetsBusyMode(false));
        dispatch(_postPet(response.data));

        //firebase refresh to change
        const db = getDatabase();
        set(ref(db, 'changeId'), Math.random());

    } catch (error) {
        dispatch(setPetsBusyMode(false));
        dispatch(setPetsError(ErrorManager.CreateErrorInfoObject(error, [
            { code: error.code },
            { request: "POST: http://localhost:3001/animals" }
        ])));
    }
};

export const getAllPets = (obj) => async (dispatch) => {
    try {
        dispatch(setPetsBusyMode(true));
        const response = await api.get("/animals", obj);
        dispatch(setPetsBusyMode(false));
        dispatch(_getAllPets(response.data));
    } catch (error) {
        dispatch(setPetsBusyMode(false));
        dispatch(setPetsError(ErrorManager.CreateErrorInfoObject(error, [
            { code: error.code },
            { request: "GET: http://localhost:3001/animals" }
        ])));
    }
};

export const updatePetInfo = (newData) => async (dispatch) => {
    try {
        dispatch(setPetsBusyMode(true));
        const response = await api.put(`/animals/${newData.id}`, newData);
        dispatch(setPetsBusyMode(false));
        dispatch(_getAllPets(response.data));
        dispatch(setPetsMessage({
            title: "Actualizacion completada",
            message: "Se han actualizado tus datos de la mascota correctamente",
            details: []
        }))

    } catch (error) {
        dispatch(setPetsBusyMode(false));
        dispatch(setPetsError(ErrorManager.CreateErrorInfoObject(error, [
            { code: error.code },
            { request: "POST: http://localhost:3001/animals" }
        ])));
    }
}