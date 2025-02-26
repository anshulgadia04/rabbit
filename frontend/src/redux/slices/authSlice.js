import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios" 


//retrive user info and token from local storage if available
const userFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

//check for existing guest Id in local storage
const initialGuestId = localStorage.getItem('guestId') || `guest_${new Date().getTime()}`;
localStorage.setItem('guestId', initialGuestId);

//initial state
const initialState = {
    user : userFromStorage,
    guestId: initialGuestId,
    loading : false,
    error : null,
};

//Async thunk to login user
export const loginUser = createAsyncThunk('auth/loginUser' , async (userData , {rejectWithValue}) => {
    try {
        // console.log("I am in loginUser thunk" , userData);
        
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login` , userData);
        // console.log(response.data);
        
        localStorage.setItem('userInfo' , JSON.stringify(response.data.user));
        localStorage.setItem('userToken' , response.data.token);

        return response.data.user; //return user data from the response
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


//Async thunk to register user
export const registerUser = createAsyncThunk('auth/registerUser' , async (userData , {rejectWithValue}) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register` , userData);
        console.log(response.data);
        
        localStorage.setItem('userInfo' , JSON.stringify(response.data.user));
        localStorage.setItem('userToken' , response.data.token);

        return response.data.user; //return user data from the response
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


//create slice
const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        logout : (state) => {
            state.user = null;
            state.guestId = `guest_${new Date().getTime()}`; // reset guest id on logout
            localStorage.removeItem('userInfo');
            localStorage.removeItem('userToken');
            localStorage.setItem('guestId', state.guestId); // set new guest id in local storage
        },

        generateNewGuestId : (state) => {
            state.guestId = `guest_${new Date().getTime()}`;
            localStorage.setItem('guestId', state.guestId); // set new guest id in local storage
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase(loginUser.pending , (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled , (state , action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(loginUser.rejected , (state , action) => {
            state.loading = true;
            state.error = action.payload.message;
        })
        .addCase(registerUser.pending , (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled , (state , action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(registerUser.rejected , (state , action) => {
            state.loading = true;
            state.error = action.payload.message;
        })
    }

});


export const {logout , generateNewGuestId} = authSlice.actions;
export default authSlice.reducer;

