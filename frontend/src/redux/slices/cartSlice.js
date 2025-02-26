import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//helper funciton to get the cart items from local storage if available
const loadCartFromStorage = () => {
    const storedCartItems = localStorage.getItem('cart');
    return storedCartItems ? JSON.parse(storedCartItems) : {products : []};
};

//helper function to save cart items to local storage
const saveCartToStorage = (cart) => {
    localStorage.setItem('cart' , JSON.stringify(cart));
};


// fetch cart by user id and guest id
export const fetchCart = createAsyncThunk('cart/fetchCart' , async ({userId , guestId} , {rejectWithValue}) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart` , 
            {
                params : {userId , guestId},
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response?.data || "Something went wrong");

    }
});

//add the item to the cart for a user and guest
export const addToCart = createAsyncThunk('cart/addToCart' , async ({productId , quantity , size , color , guestId , userId} , {rejectWithValue}) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart` , {productId , quantity , size , color , guestId , userId});

        console.log(response.data);
        return response.data;
        
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response?.data || "Something went wrong");

    }
});

//update the quantity of the item in the cart
export const updateCart = createAsyncThunk('cart/updateCartItemQuantity' , async ({productId, quantity, size, color, guestId, userId} , {rejectWithValue}) => {

    try {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart` , {productId, quantity, size, color, guestId, userId});

        return response.data;

    } catch (error) {

        console.log(error);

        return rejectWithValue(error.response?.data || "Something went wrong");

    }
});


//remove the item from the cart
export const removeFromCart = createAsyncThunk('cart/removeFromCart' , async ({productId , size , color , guestId , userId} , {rejectWithValue}) => {

    const url = `${import.meta.env.VITE_BACKEND_URL}/api/cart`;
    try {
        const response = await axios.delete(url , {
            data : {
                productId , size , color , guestId , userId,
            }
        });

        return response.data;

    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response?.data || "Something went wrong");

    }
});


//merge the guest cart with the user cart
export const mergeCart = createAsyncThunk('cart/mergeCart' , async ({guestId , user} , {rejectWithValue}) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/merge` , {guestId , user} , {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('userToken')}`,
            }
        });

        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response?.data || "Something went wrong");

    }
});

const cartSlice = createSlice({
    name : "cart",
    initialState : {
        cart : loadCartFromStorage(),
        loading : false,
        error : null,
    },
    reducers : {
        clearCart : (state) => {
            state.cart = {products : []};
            localStorage.removeItem('cart');
        },
    },
    extraReducers : (builder) => {
        builder.addCase(fetchCart.pending , (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchCart.fulfilled , (state , action) => {
            state.cart = action.payload;
            saveCartToStorage(action.payload);
            state.loading = false;
        })
        .addCase(fetchCart.rejected , (state , action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch cart.";
        })
        .addCase(addToCart.pending , (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addToCart.fulfilled , (state , action) => {
            state.cart = action.payload;
            saveCartToStorage(action.payload);
            state.loading = false;
        })
        .addCase(addToCart.rejected , (state , action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to add to cart.";
        })
        .addCase(updateCart.pending , (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateCart.fulfilled , (state , action) => {
            state.cart = action.payload;
            saveCartToStorage(action.payload);
            state.loading = false;
        })
        .addCase(updateCart.rejected , (state , action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to update cart.";
        })
        .addCase(removeFromCart.pending , (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(removeFromCart.fulfilled , (state , action) => {
            state.cart = action.payload;
            saveCartToStorage(action.payload);
            state.loading = false;
        })
        .addCase(removeFromCart.rejected , (state , action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to remove from cart.";
        })
        .addCase(mergeCart.pending , (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(mergeCart.fulfilled , (state , action) => {
            state.cart = action.payload;
            saveCartToStorage(action.payload);
            state.loading = false;
        })
        .addCase(mergeCart.rejected , (state , action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to merge cart.";
        })
    }
});


export const {clearCart} = cartSlice.actions;
export default cartSlice.reducer;