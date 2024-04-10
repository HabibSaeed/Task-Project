import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const loginAsync = createAsyncThunk("auth/login", async ({ email, password }) => {
    const response = await axios.post(`${BASE_URL}/api/login`, { email, password });
    if (response.data.status) {
        alert(response.data.message);
        console.log(response.data)
        return response.data;
    } else {
        alert(response.data.message);
        return
    }
});

export const signUpAsync = createAsyncThunk("auth/signup", async ({ fullName, email, password }) => {
    const response = await axios.post(`${BASE_URL}/api/signup`, { fullName, email, password });
    if (response.data.status) {
        alert(response.data.message);
        return response.data;
    } else {
        alert(response.data.message);
        return
    }
});

const initialState = {
    user: null,
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(signUpAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(signUpAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(signUpAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;