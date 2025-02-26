import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";


// fetch order by user id and guest id
export const fetchUsersOrder = createAsyncThunk('order/fetchUsersOrder' , async ({} , {rejectWithValue}) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/my-orders` , 
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response?.data || "Something went wrong");

    }
});


// fetch order by order id
export const fetchOrderDetails = createAsyncThunk('order/fetchOrderDetails' , async ({orderId} , {rejectWithValue}) => {
    try {
        const reponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}` ,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                }
            });

            return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response?.data || "Something went wrong");
    }
});


//create slice
const orderSlice = createSlice({
    name : "orders",
    initialState : {
        loading : false,
        error : null,
        orders : [],
        totalOrder : 0,
        orderDetails : null,
    },
    reducers : {},

    extraReducers : (builder) => {
        builder
        .addCase(fetchUsersOrder.pending , (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchUsersOrder.fulfilled , (state , action) => {
            state.orders = action.payload;
            state.loading = false;
        })
        .addCase(fetchUsersOrder.rejected , (state , action) => {
            state.loading = false;
            state.error = action.payload?.message;
        })


        .addCase(fetchOrderDetails.pending , (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchOrderDetails.fulfilled , (state , action) => {
            state.orderDetails = action.payload;
            state.loading = false;
        })
        .addCase(fetchOrderDetails.rejected , (state , action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});


export default orderSlice.reducer;