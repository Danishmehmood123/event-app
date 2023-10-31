import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    favorites : []
};

const eventSlice = createSlice({
  name: 'eventSlice',
  initialState,
  reducers: {
    addToFav: (state, action) => {
      state.favorites.push(action.payload)
    }
    ,
  },
});

export const { addToFav } = eventSlice.actions;

export default eventSlice.reducer