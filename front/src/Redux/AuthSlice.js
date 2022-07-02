import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    const response = await fetch("http://localhost:3003/auth", {
      method: "POST",
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin':'*',
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { data, failed: true };
    }
    window.localStorage.setItem("token", data.data)
    thunkAPI.dispatch(loginUser({token: data.data}));

    return data;
  }
);

const initialState = {
  token: "",
  name: "",
  email: "",
  isAdmin: false,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, { payload }) => {

      state.token = payload.token;
    },
    logout: (state) => {
      state.email = "";
      state.token = "";
      window.localStorage.removeItem("token");
    },
    SaveEmail: (state, { payload }) => {
      state.email = payload.email;
      state.name = payload.name;
    },
    EnterAdmin: (state) => {
      state.isAdmin = true;
    },
    ExitAdmin: (state) => {
      state.isAdmin = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginUser, logout, SaveEmail, EnterAdmin, ExitAdmin } =
  AuthSlice.actions;

export default AuthSlice.reducer;
