import { createSlice } from "@reduxjs/toolkit"
import ErrorManager from "../../resources/ErrorManager"
import { getAuth } from "firebase/auth";
import api from "../../services/api"
import FirebaseApp from "../../services/firebaseApp";

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
            if(auth.currentUser){
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
        console.log(response)
        dispatch(setCurrentUser(response.data))
    } catch (error) {
        dispatch(setUserError(ErrorManager.CreateErrorInfoObject(error, [
            { code: error.code },
            { request: "POST: http://localhost:3001/users" }
        ])));
    }
}

export const federatedLogin = (token, userData) => async (dispatch) => {
    try {
        console.log(userData);
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