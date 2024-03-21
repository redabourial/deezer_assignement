import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: []
    },
    reducers: {
        addUser: (state, user) => {
            state[user.id] = user;
        },
    }
});

export const { addUser } = usersSlice.actions;

export default usersSlice.reducer;
