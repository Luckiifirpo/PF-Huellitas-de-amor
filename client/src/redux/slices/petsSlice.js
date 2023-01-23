import { createSlice } from "@reduxjs/toolkit";
import api from "../../services/api"

const initialState = {
    petsList: []
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
            state.petsList = action.payload.map((petData) => {
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
        }
    }
});

const { _postPet, _getAllPets } = petsSlice.actions;

export default petsSlice.reducer

export const postPet = (obj) => async (dispatch) => {
    try {
        const response = await api.post("/animals", obj);
        dispatch(_postPet(response.data));
    } catch (error) {
        console.log(error);
    }
};

export const getAllPets = (obj) => async (dispatch) => {
    try {
        const response = await api.get("/animals", obj);
        dispatch(_getAllPets(response.data));
    } catch (error) {
        console.log(error);
    }
};