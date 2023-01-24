import { createSlice } from "@reduxjs/toolkit"
import ErrorManager from "../../resources/ErrorManager"
import api from "../../services/api"

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        currentUser: null,
        errors: null
    },
    reducers: {
        _setCurrentUser(state, action) {
            state.currentUser = action.payload
        },
        resetCurrentUser: (state) => {
            state.currentUser = null;
        },
        setUserError: (state, action) => {
            state.errors = action.payload;
        },
        resetUserError: (state) => {
            state.errors = null
        }
    },
})
const { _setCurrentUser, setUserError } = userSlice.actions
export const { resetUserError, resetCurrentUser } = userSlice.actions;

export default userSlice.reducer;

export const postUser = (obj) => async (dispatch) => {
    try {
        const response = await api.post(`/users`, obj);
        console.log(response)
        dispatch(_setCurrentUser(response.data))
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
        dispatch(_setCurrentUser(response.data));
        sessionStorage.setItem("federated-login-token", token);

    } catch (error) {
        dispatch(setUserError(ErrorManager.CreateErrorInfoObject(error, [
            { code: error.code },
            { request: "POST: http://localhost:3001/auth/federated_login" }
        ])));
    }
}