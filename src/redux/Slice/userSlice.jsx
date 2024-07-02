import { createSlice } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  loggedInUser: null  // Assuming loggedInUser is part of your initial state
};

// Create a slice for user management
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action to handle the start of a login process
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Action to handle a successful login
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    // Action to handle a login failure
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Action to handle logout
    logout: (state) => {
      state.currentUser = null;
    },
    // Action to set the logged-in user
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
  }
});

// Export actions to be used in components or thunks
export const { loginStart, loginSuccess, loginFailure, logout, setLoggedInUser } = userSlice.actions;

// Selectors to retrieve data from the state
export const selectCurrentUser = (state) => state.user.currentUser;
export const selectLoggedInUser = (state) => state.user.loggedInUser;

// Export the reducer to be used in the store
export default userSlice.reducer;
