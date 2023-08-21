import { createSlice } from "@reduxjs/toolkit";
import { store } from "../store";
// import localStorage from "redux-persist/es/storage";
import { MockData, Users } from "../../mockData";
// ----------------------------------------------------------------------
const initialState = {
  authToken: "",
  users: [...Users],
  formDataList: [...MockData],
};

const slice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setAuthToken(state, action) {
      state.authToken = action.payload;
    },
    setUsers(state, action) {
      state.users = [...state.users, action.payload];
    },
    setFormDataList(state, action) {
      state.formDataList = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;
export const { setAuthToken, setUsers, setFormDataList } = slice.actions;

// ----------------------------------------------------------------------

export function login(data, cb) {
  return async () => {
    //mocked(should call api)
    const state = store.getState().main;
    const foundUser = state.users.find(
      (item) =>
        item.username === data.Username && item.password === data.Password
    );
    cb(foundUser);
  };
}

export function register(data, cb) {
  //mocked(should call api)
  return async () => {
    const state = store.getState().main;
    const foundUser = state.users.find(
      (item) => item.username === data.Username
    );
    cb(foundUser, data);
  };
}
