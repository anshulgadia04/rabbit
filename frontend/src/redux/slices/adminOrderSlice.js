import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//fetch all orders by admin
export const fetchAllOrders = createAsyncThunk(
    'adminOrders/fetchAllOrders',
    async (_ , {rejectWithValue}) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`, {
                headers : {Authorization : `Bearer ${localStorage.getItem('userToken')}`}
        });

        return response.data;

        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


//update order delivery status by admin
export const updateOrderStatus = createAsyncThunk(
    'adminOrders/updateOrderStatus',
    async ({id , status} , {rejectWithValue}) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`, 
                {status},
                {headers : {Authorization : `Bearer ${localStorage.getItem('userToken')}`}
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);    
        }

        
    }
);

//delete the order by admin
export const deleteOrder = createAsyncThunk(
    'adminOrders/deleteOrder',
    async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`, {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('userToken')}`
                }
            });
            return id;
        } catch (error) {
            
        }
    }
);

const adminOrderSlice = createSlice({
    name : "adminOrders",
    initialState : {
        loading : false,
        totalOrder : 0,
        totalSales : 0,
        error : null,
        orders : [],
    },
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(fetchAllOrders.pending , (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchAllOrders.fulfilled , (state , action) => {
            state.loading = false;
            state.orders = action.payload;
            state.totalOrder = action.payload.length;
            state.totalSales = action.payload.reduce((acc , order) => acc + order.totalPrice , 0);
            state.totalSales = totalSales;
        })
        .addCase(fetchAllOrders.rejected , (state , action) => {
            state.loading = false;
            state.error = action.payload.message;
        })


        .addCase(updateOrderStatus.pending , (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateOrderStatus.fulfilled , (state , action) => {
            state.loading = false;
            const index = state.orders.findIndex(order => order._id === action.payload._id);
            if(index !== -1){
                state.orders[index] = action.payload;
            }
        })
        .addCase(updateOrderStatus.rejected , (state , action) => {
            state.loading = false;
            state.error = action.payload.message;
        })


        .addCase(deleteOrder.pending , (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteOrder.fulfilled , (state , action) => {
            state.loading = false;
            state.orders = state.orders.filter(order => order._id !== action.payload);
        })
        .addCase(deleteOrder.rejected , (state , action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
    }
});


export default adminOrderSlice.reducer;