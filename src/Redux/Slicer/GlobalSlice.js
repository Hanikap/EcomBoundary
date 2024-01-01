import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    searchQuery: '',
    priceRange: [0, 1000],
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
  },
});

export const { setSearchQuery, setPriceRange } = globalSlice.actions;
export default globalSlice.reducer;
