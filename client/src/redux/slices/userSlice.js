import { createSlice } from "@reduxjs/toolkit"
import ErrorManager from "../../resources/ErrorManager"
import api from "../../services/api"
export const userSlice = createSlice({
    name: 'users',
    initialState: {
        createUser: {},
        errors: null
    },
    reducers: {
        _postUser(state, action) {
            state.createUser = action.payload
        },
        _federatedLogin(state, action) {
            state.createUser = action.payload
        },
        setUserError: (state, action) => {
            state.errors = action.payload;
        },
        resetUserError: (state) => {
            state.errors = null
        }
    },
})
const { _postUser, setUserError } = userSlice.actions
export const { resetUserError } = userSlice.actions;

export default userSlice.reducer;

export const postUser = (obj) => async (dispatch) => {
    try {
        const response = await api.post(`/users`, obj);
        console.log(response)
        dispatch(_postUser(response.data))
    } catch (error) {
        dispatch(setUserError(ErrorManager.CreateErrorInfoObject(error, [
            { code: error.code },
            { request: "POST: http://localhost:3001/users" }
        ])));
    }
}

export const federatedLogin = (token, userData) => async (dispatch) => {
    try {
        const response = await api.post(`/auth/federated_login`, { userData }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        dispatch(_postUser(response.data))
    } catch (error) {
        console.log(error);
        dispatch(setUserError(ErrorManager.CreateErrorInfoObject(error, [
            { code: error.code },
            { request: "POST: http://localhost:3001/auth/federated_login" }
        ])));
    }
}