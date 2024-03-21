import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./redux/users";

export default configureStore({
  reducer: {
    users: usersSlice
  }
});
