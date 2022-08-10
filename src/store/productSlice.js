import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//enum for status
export const STATUSES = {
    IDLE: "idle",
    ERROR: "Error",
    LOADING: "Loading...",
};

const productSlice = createSlice({
    name: "product",
    initialState: {
        data: [],
        status: STATUSES.IDLE,
    },

    reducers: {
        // setProducts(state, action) {
        //     state.data = action.payload;
        // },
        // setStatus(state, action) {
        //     state.status = action.payload;
        // },
    },
    extraReducers: (builder) => {
        builder

            .addCase(fetchProducts.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })

            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
            })

            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
    },
});

export const { add, remove } = productSlice.actions;

export default productSlice.reducer;

//thunks

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    return data;
});
