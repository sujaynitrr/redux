import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ==============================
//   API 1: LOGIN (Dummy API)
// ==============================
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });

      // returns: { token: "QpwL5tke4Pnpja7X4" }
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

// ==============================
//   API 2: DUMMY PROFILE API
// ==============================
export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("https://reqres.in/api/users/2");

      // returns: { data: {...user details} }
      return res.data.data;
    } catch (error) {
      return rejectWithValue("Failed to load profile");
    }
  }
);

// ==============================
//   API 3: DUMMY USERS LIST
// ==============================
export const getAllUsers = createAsyncThunk(
  "auth/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      return res.data;
    } catch (error) {
      return rejectWithValue("Could not load users");
    }
  }
);

// ==============================
//   Slice
// ==============================
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    user: null,
    usersList: [],
    isLoading: false,
    error: null,
    isLoggedIn: false,
  },

  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder

      // 🌟 LOGIN
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.isLoggedIn = true;

        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 🌟 PROFILE
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 🌟 USERS LIST
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.usersList = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
