import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
    name: "users",
    initialState: {
        data: {},
    },
    reducers: {
        addUser: (state, { payload }) => {
            state.data[payload.pk] = payload;
        },
    },
});

export const { addUser, setError } = usersSlice.actions;

export default usersSlice.reducer;
