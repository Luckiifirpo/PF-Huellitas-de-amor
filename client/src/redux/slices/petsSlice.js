import { createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import ErrorManager from "../../resources/ErrorManager";

const initialState = {
    petsList: [],
    errors: null
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
            state.errors = action.payload;
        },
        resetPetsError: (state) => {
            state.errors = null
        }
    }
});

const { _postPet, _getAllPets, setPetsError } = petsSlice.actions;
export const { resetPetsError } = petsSlice.actions;

export default petsSlice.reducer

export const postPet = (obj) => async (dispatch) => {
    try {
        const response = await api.post("/animals", obj);
        dispatch(_postPet(response.data));
    } catch (error) {
        dispatch(setPetsError(ErrorManager.CreateErrorInfoObject(error, [
            { code: error.code },
            { request: "POST: http://localhost:3001/animals" }
        ])));
    }
};

export const getAllPets = (obj) => async (dispatch) => {
    try {
        const response = await api.get("/animals", obj);
        dispatch(_getAllPets(response.data));
    } catch (error) {
        dispatch(setPetsError(ErrorManager.CreateErrorInfoObject(error, [
            { code: error.code },
            { request: "GET: http://localhost:3001/animals" }
        ])));
    }
};