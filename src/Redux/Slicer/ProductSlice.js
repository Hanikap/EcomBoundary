import { createSlice } from "@reduxjs/toolkit";
//1st  part of slice


export const productSlice = createSlice({

    name: "Product",
    initialState: {
        products: [],
        cart: [],
    wishlist: [],
    },
    reducers: {
        //for ading data from product.js to redux
        add: (state, action) => {
            return {
                ...state,
                products: [...state.products, ...action.payload]
            };
        },
        //for showing data in redux while increasing cart : cart button 
        update: (state, action) => {
           
            return {
                ...state,
                products: action.payload
            };
        },
       
        addToCart: (state, action) => {
            const productToAdd = state.products.find((product) => product.id === action.payload);
            state.cart.push(productToAdd);
          },
          addToWishlist: (state, action) => {
            const productToAdd = state.products.find((product) => product.id === action.payload);
            state.wishlist.push(productToAdd);
          },


    }
   
    
})
export const {  add, update, addToCart, addToWishlist } = productSlice.actions;
export default productSlice.reducer;
