import { createSlice } from "@reduxjs/toolkit";
import api from "../../services/api"
import testingData from "../../petList.json";

const initialState = {
    petsList: testingData
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
        }
    }
});

const { _postPet } = petsSlice.actions;

export default petsSlice.reducer

export const postPet = (obj) => async (dispatch) => {
    try {
        const response = await api.post("/animals", obj);
        dispatch(_postPet(response.data));
    } catch (error) {
        console.log(error);
    }
};