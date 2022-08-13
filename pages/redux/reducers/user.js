import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dataTransfer: null,
};

export const user = createSlice({
  name: 'dataUser',
  initialState,
  reducers: {},
});

// export const { increment, decrement, customValue } = counterSlice.actions;

export default user.reducer;
