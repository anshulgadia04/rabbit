import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



//fetch all users admin
export const fetchAllUsers = createAsyncThunk(
    'admin/fetchAllUsers',
    async () => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('userToken')}`
            }
        });
        return response.data;
});


//add the create user 
export const addUser = createAsyncThunk(
    'admin/addUser',
    async (userData , {rejectWithValue}) => {
        try 
        {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`, 
                userData, 
                {headers : { Authorization : `Bearer ${localStorage.getItem('userToken')}`}
            });

            return response.data;

        } catch (error) {
            
            return rejectWithValue(error.response.data);
        }
    }
);

//update user info admin
export const updateUser = createAsyncThunk(
    'admin/updateUser',
    async (email , id , name , role) => {
        try 
        {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`, 
                {email , name , role}, 
                {headers : { Authorization : `Bearer ${localStorage.getItem('userToken')}`}
            });

            return response.data;

        } catch (error) {
            
            return rejectWithValue(error.response.data);
        }
    }
);


// delete the user by admin
export const deleteUser = createAsyncThunk(
    'admin/deleteUser',
    async (id) => {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('userToken')}`
            }
        });
        return id;
});

        
const AdminSlice = createSlice({
    name : "admin",
    initialState : {
        loading : false,
        error : null,
        users : [],
    },
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(fetchAllUsers.pending , (state) => {
            state.loading = true;
        })
        .addCase(fetchAllUsers.fulfilled , (state , action) => {
            state.loading = false;
            state.users = action.payload;
        })
        .addCase(fetchAllUsers.rejected , (state , action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(addUser.pending , (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addUser.fulfilled , (state , action) => {
            state.loading = false;
            state.users.push(action.payload);
        })
        .addCase(addUser.rejected , (state , action) => {
            state.loading = false;  
            state.error = action.payload.message;
        })
        .addCase(updateUser.pending , (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateUser.fulfilled , (state , action) => {
            state.loading = false;
            const updatedUser = action.payload;
            const index = state.users.findIndex(user => user._id === updateUser._id);
            if(index !== -1){
                state.users[index] = updatedUser;
            }
        })
        .addCase(updateUser.rejected , (state , action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(deleteUser.pending , (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteUser.fulfilled , (state , action) => {
            state.loading = false;
            state.users = state.users.filter(user => user._id !== action.payload);
        })
        .addCase(deleteUser.rejected , (state , action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
});    


export default AdminSlice.reducer;