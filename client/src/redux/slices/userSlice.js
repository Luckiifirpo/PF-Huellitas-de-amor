import { createSlice } from "@reduxjs/toolkit"
import ErrorManager from "../../resources/ErrorManager"
import { getAuth } from "firebase/auth";
import api from "../../services/api"
import FirebaseApp from "../../services/firebaseApp";
import { async } from "@firebase/util";

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        currentUser: null,
        errors: null
    },
    reducers: {
        setCurrentUser(state, action) {
            state.currentUser = action.payload;
            sessionStorage.setItem("user-id", action.payload.id);
        },
        resetCurrentUser: (state) => {
            state.currentUser = null;
        },
        signOut: (state) => {
            state.currentUser = null;
            sessionStorage.removeItem("user-id");

            const auth = getAuth(FirebaseApp);
            if (auth.currentUser) {
                auth.signOut();
            }
        },
        setUserError: (state, action) => {
            state.errors = action.payload;
        },
        resetUserError: (state) => {
            state.errors = null
        }
    },
})
const { setUserError } = userSlice.actions
export const { resetUserError, resetCurrentUser, setCurrentUser, signOut } = userSlice.actions;

export default userSlice.reducer;

export const postUser = (obj) => async (dispatch) => {
    try {
        const response = await api.post(`/users`, obj);
        dispatch(setCurrentUser(response.data))
    } catch (error) {
        dispatch(setUserError(ErrorManager.CreateErrorInfoObject(error, [
            { code: error.code },
            { request: "POST: http://localhost:3001/users" }
        ])));
    }
}

export const loginWithEmailAndPassword = (email, password) => async (dispatch) => {
    try {
        const response = await api.post(`/auth/login`, { email, password });
        console.log(response.data);
        dispatch(setCurrentUser(response.data));
    } catch (error) {
        dispatch(setUserError(ErrorManager.CreateErrorInfoObject(error, [
            { code: error.code },
            { request: "POST: http://localhost:3001/auth/login" }
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
        dispatch(setCurrentUser(response.data));

    } catch (error) {
        dispatch(setUserError(ErrorManager.CreateErrorInfoObject(error, [
            { code: error.code },
            { request: "POST: http://localhost:3001/auth/federated_login" }
        ])));
    }
}