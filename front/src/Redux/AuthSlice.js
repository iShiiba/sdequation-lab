import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    const response = await fetch("http://localhost:3003/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { data, failed: true };
    }

    thunkAPI.dispatch(loginUser(data));

    return data;
  }
);

const initialState = {
  token: "",
  name: "",
  email: "",
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, { payload }) => {
      state.token = payload.token;
      state.name = payload.user.name;
      state.email = payload.user.email;

    },
    logout: (state) => {
      state.token = "";
    },
    SaveEmail: (state, { payload }) => {
      state.email = payload.email;
      state.name = payload.name;
    },
  },
});


// Action creators are generated for each case reducer function
export const { loginUser, logout, SaveEmail } = AuthSlice.actions;

export default AuthSlice.reducer;
