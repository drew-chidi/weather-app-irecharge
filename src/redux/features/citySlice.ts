import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CityState {
  cities: string[];
  favorites: string[];
}

const initialState: CityState = {
  cities: [],
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    addCity: (state, action: PayloadAction<string>) => {
      state.cities.push(action.payload);
    },
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (favorite) => favorite !== action.payload
      );
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
  },
});

export const { addCity, addFavorite, removeFavorite } = citySlice.actions;
export default citySlice.reducer;
