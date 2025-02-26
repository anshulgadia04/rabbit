import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//fetch all admin products
export const fetchAdminProducts = createAsyncThunk(
    'admin/fetchAdminProducts',
    async () => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products`, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('userToken')}`
            }
        });
        return response.data;
});

//add the product by admin
export const createAdminProduct = createAsyncThunk(
    'admin/createAdminProduct',
    async (productData) => {
       
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products`, 
                productData, 
                {headers : { Authorization : `Bearer ${localStorage.getItem('userToken')}`}
            });

            return response.data;
});


//update product by admin
export const updateAdminProduct = createAsyncThunk(
    'admin/updateAdminProduct',
    async ({id, productData}) => {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products/${id}`,  
                productData, 
                {headers : { Authorization : `Bearer ${localStorage.getItem('userToken')}`}}
            );

        return response.data;
});


//delete the product by admin
export const deleteAdminProduct = createAsyncThunk(
    'admin/deleteAdminProduct',
    async (id) => {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products/${id}`, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('userToken')}`
            }
        });
        return id;
});


const adminProductSlice = createSlice({
    name : "adminProducts",
    initialState : {
        loading : false,
        error : null,
        products : [],
    },
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(fetchAdminProducts.pending , (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchAdminProducts.fulfilled , (state , action) => {
            state.loading = false;
            state.products = action.payload;
        })
        .addCase(fetchAdminProducts.rejected , (state , action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(createAdminProduct.pending , (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createAdminProduct.fulfilled , (state , action) => {
            state.loading = false;
            state.products.push(action.payload);
        })
        .addCase(createAdminProduct.rejected , (state , action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(updateAdminProduct.pending , (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateAdminProduct.fulfilled , (state , action) => {
            state.loading = false;
            const index = state.products.findIndex(product => product._id !== action.payload._id);
            if(index !== -1){
                state.products[index] = action.payload;
            }
        })
        .addCase(updateAdminProduct.rejected , (state , action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(deleteAdminProduct.pending , (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteAdminProduct.fulfilled , (state , action) => {
            state.loading = false;
            state.products = state.products.filter(product => product._id !== action.payload);
        })
        .addCase(deleteAdminProduct.rejected , (state , action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});


export default adminProductSlice.reducer;
