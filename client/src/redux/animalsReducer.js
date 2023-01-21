import { createSlice } from "@reduxjs/toolkit"
import api from "../services/api"

export const animalsReducer = createSlice({
    name: 'animals',
    initialState: {
        createPost:{}
    },
    reducers: {
      postAnimal(state, action) {
        state.createPost = action.payload
      },
    },
})
const { postAnimal } = animalsReducer.actions

export default animalsReducer.reducer;
  
export const createAnimalPost = (obj) => async (dispatch) => {
    try {
        const response = await api.post(`/animals`,obj);
        console.log(response)
        dispatch(postAnimal(response.data))
    } catch (error) {
        console.log(error)
    }
}