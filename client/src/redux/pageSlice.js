import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pets: [],
  petsDetail: [],
  addPets: [],
  updatePets: [],
  deletePets: [],
  users: [],
  usersDetail: [],
  addUser: [],
  updateUser: [],
  deleteUser: [],
  adoptions: [],
  favorite: [],
  cart: [],
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    addPet: (state, action) => {
      state.addPets = action.payload;
    },
    pets: (state, action) => {
      state.pets = action.payload;
    },
    petsDetail: (state, action) => {
      state.petsDetail = action.payload;
    },
    updatePets: (state, action) => {
      state.updatePets = action.payload;
    },
    deletePets: (state, action) => {
      state.deletePets = action.payload;
    },
    users: (state, action) => {
      state.users = action.payload;
    },
    usersDetail: (state, action) => {
      state.usersDetail = action.payload;
    },
    addUser: (state, action) => {
      state.addUser = action.payload;
    },
    updateUser: (state, action) => {
      state.updateUser = action.payload;
    },
    deleteUser: (state, action) => {
      state.deleteUser = action.payload;
    },
    adoptions: (state, action) => {
      state.adoptions = action.payload;
    },
    favorite: (state, action) => {
      state.favorite = action.payload;
    },
    cart: (state, action) => {
      state.cart = action.payload;
    },
  },
});
