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
const { _postUser } = userReducers.actions

export default userReducers.reducer;
  
export const postUser = (obj) => async (dispatch) => {
    try {
        const response = await api.post(`/users`,obj);
        console.log(response)
        dispatch(_postUser(response.data))
    } catch (error) {
        console.log(error)
    }
}