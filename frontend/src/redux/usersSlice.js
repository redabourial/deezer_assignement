import { createUser, getUser } from "/src/api/users";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { flatten } from "lodash";

export const registerUser = createAsyncThunk(
  "users/createUser",
  async (user) => {
    const resp = await createUser(user);
    if (resp.status >= 400) {
      const err = flatten(Object.values(resp.data));
      throw new Error(err);
    }
    return resp.data;
  },
);

export const fetchUser = createAsyncThunk("users/fetchUser", async (userId) => {
  const resp = await getUser(userId);
  if (resp.status >= 400) {
    throw new Error("user not found");
  }
  return resp.data;
});

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: {},
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data[payload.pk] = payload;
      })
      .addCase(registerUser.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(fetchUser.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data[payload.pk] = payload;
      })
      .addCase(fetchUser.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });
  },
});

export default usersSlice.reducer;
