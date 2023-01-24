import { createSlice } from "@reduxjs/toolkit"
import api from "../../services/api"
export const userReducers = createSlice({
    name: 'users',
    initialState: {
        createUser:{}
    },
    reducers: {
      _postUser(state, action) {
        state.createUser = action.payload
      },
      _federatedLogin(state, action) {
        state.createUser = action.payload
      }
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

export const federatedLogin = (token, userData) => async (dispatch) => {
    try {
        const response = await api.post(`/auth/federated_login`, {userData}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        dispatch(_postUser(response.data))
    } catch (error) {
        console.log(error)
    }
}