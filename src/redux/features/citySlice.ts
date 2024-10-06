import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CityState {
  cities: string[];
  favorites: string[];
}

const initialState: CityState = {
  cities: [],
  favorites: [],
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    addCity: (state, action: PayloadAction<string>) => {
      state.cities.push(action.payload);
    },
    addFavorite: (state, action: PayloadAction<string>) => {
      state.favorites.push(action.payload);
    },
  },
});

export const { addCity, addFavorite } = citySlice.actions;
export default citySlice.reducer;
