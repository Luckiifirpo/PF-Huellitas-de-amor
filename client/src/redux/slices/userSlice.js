import { createSlice } from "@reduxjs/toolkit"
import api from "../../services/api"
export const userReducers = createSlice({
    name: 'users',
    initialState: {
        createUser:{}
    },
    reducers: {
      postUser(state, action) {
        state.createUser = action.payload
      },
    },
})
const { postUsers } = userReducers.actions

export default userReducers.reducer;
  
export const createUser = (obj) => async (dispatch) => {
    try {
        const response = await api.post(`/users`,obj);
        console.log(response)
        dispatch(postUsers(response.data))
    } catch (error) {
        console.log(error)
    }
}