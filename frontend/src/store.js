import { configureStore } from "@reduxjs/toolkit";

import usersSlice from "./redux/usersSlice";

export default configureStore({
  reducer: {
    users: usersSlice,
  },
});
