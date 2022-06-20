import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const Register = createAsyncThunk(
  "register/user",
  async (userData, thunkAPI) => {
    const response = await fetch("http://localhost:3003/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {data, failed: true};
    }

    thunkAPI.dispatch(loginUser(data));

    return data;
  }
);

const initialState = {
  token: "",
  name: "",
};

export const RegisterSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    loginUser: (state, { payload }) => {
      state.token = payload.token;
      state.name = payload.user.name;
    },
    logout: (state) => {
      state.token =  "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginUser, logout } = RegisterSlice.actions;

export default RegisterSlice.reducer;