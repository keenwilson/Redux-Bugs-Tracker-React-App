import { createSlice } from '@reduxjs/toolkit';

let lastId = 0;

const slice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    // actions => action handlers
    userAdded: (users, action) => {
      users.push({ id: ++lastId, name: action.payload.name });
    }
  }
});

// Name export actions outside of the module
export const { userAdded } = slice.actions;
// Reducer has to be a default export in ducks pattern
export default slice.reducer;
