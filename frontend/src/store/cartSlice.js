import { createSlice } from '@reduxjs/toolkit';

// Load cart state from local storage if available
const persistedState = localStorage.getItem('reduxCartState');
const initialState = persistedState ? JSON.parse(persistedState) : {};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { storeId, product } = action.payload;
            // Add orderQuantity attribute to the product object
            const productWithQuantity = { ...product, orderQuantity: 1 };
            if (state.hasOwnProperty(storeId)) {
                state[storeId].push(productWithQuantity);
            } else {
                state[storeId] = [productWithQuantity];
            }
            // Save updated state to local storage
            localStorage.setItem('reduxCartState', JSON.stringify(state));
        },
        updateCartItemQuantity: (state, action) => {
            const { storeId, productId, quantity } = action.payload;
            if (state.hasOwnProperty(storeId)) {
                const productIndex = state[storeId].findIndex(
                    (item) => item._id === productId
                );
                if (productIndex !== -1) {
                    state[storeId][productIndex].orderQuantity = quantity;
                    // Save updated state to local storage
                    localStorage.setItem('reduxCartState', JSON.stringify(state));
                }
            }
        },
        removeItemFromCart: (state, action) => {
            const { storeId, productId } = action.payload;
            if (state.hasOwnProperty(storeId)) {
                state[storeId] = state[storeId].filter(
                    (item) => item._id !== productId
                );
                // Save updated state to local storage
                localStorage.setItem('reduxCartState', JSON.stringify(state));
            }
        },
    },
});

export const { addToCart, updateCartItemQuantity, removeItemFromCart } = cartSlice.actions;

export default cartSlice.reducer;
