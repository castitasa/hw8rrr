import { createSlice } from "@reduxjs/toolkit";
import fetchAllcartItems, { fetchToAddItem } from "../reducer/CartCreated";

const initialState = {
     cart: [],
     isLoadingCart: false,
     cartError: '',
     cartStatus: 'pending',
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        setCart: ( state, action)=>{
            state.cart = action.payload
        },
    },
    extraReducers:(builder) => {
        builder.addCase(fetchAllcartItems.pending, (state, action) => {
            state.cartStatus = 'pending';
            state.cartError = '';
            state.cart = [];
            state.isLoadingCart = true;
        });

        builder.addCase(fetchAllcartItems.fulfilled, (state, action) => {
            state.cart = action.payload;
            state.isLoadingCart = false;

            if (action.payload.length) {
                 state.cartStatus = 'fulfilled';
                return;
            }

            state.cartStatus = 'empty';
        })

        builder.addCase(fetchAllcartItems.rejected, (state, action) => {
            state.cartStatus = 'rejected';
            state.isLoadingCart = false;
            state.cartError = action.payload;
        });
    },
});

const cartReducer = cartSlice.reducer;

export const {setCart} = cartSlice.actions;
export default cartReducer;