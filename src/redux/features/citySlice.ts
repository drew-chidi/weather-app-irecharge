import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CityState {
  favorites: string[];
}

const initialState: CityState = {
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
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

export const { addFavorite, removeFavorite } = citySlice.actions;
export default citySlice.reducer;
