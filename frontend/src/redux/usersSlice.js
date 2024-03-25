import { createUser, getUser } from "/src/api/users";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { flatten } from "lodash";

export const registerUser = createAsyncThunk(
  "users/createUser",
  async (user) => {
    const startTime = new Date();
    const resp = await createUser(user);
    const timeToRespond = (new Date() - startTime) / 1000;
    if (resp.status >= 400) {
      const err = flatten(Object.values(resp.data)).join(",");
      throw new Error(err);
    }
    return { ...resp.data, time_to_query: timeToRespond };
  },
);

export const fetchUser = createAsyncThunk("users/fetchUser", async (userId) => {
  const resp = await getUser(userId);
  if (resp.status >= 400) {
    throw new Error("user not found");
  }
  return resp.data;
});

export const extraReducers = (builder) =>
  builder
    .addCase(registerUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data[payload.pk] = payload;
    })
    .addCase(fetchUser.fulfilled, (state, { payload }) => {
      state.data[payload.pk] = payload;
    });

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: {},
  },
  extraReducers,
});

export default usersSlice.reducer;
