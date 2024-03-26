import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";

import Profile from "./index";

jest.mock("axios");

const mockStore = configureStore([thunk]);

describe("Profile Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      users: {
        data: {
          57: {
            pk: 57,
            username: "Test User",
            email: "test@example.com",
          },
        },
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("renders user profile information", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/users/57"]}>
          <Routes>
            <Route path="/users/:userId" element={<Profile />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText("User Info")).toBeInTheDocument();
      expect(screen.getByText("Username")).toBeInTheDocument();
      expect(screen.getByText("Test User")).toBeInTheDocument();
      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(screen.getByText("test@example.com")).toBeInTheDocument();
    });
  });

  it("fetches user data from API if user does not exist in store", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        pk: 2,
        username: "Another User",
        email: "another@example.com",
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/users/2"]}>
          <Routes>
            <Route path="/users/:userId" element={<Profile />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(axios.get).toHaveBeenCalledWith("/api/users/2/");
    await waitFor(() => expect(store.getActions().length).toEqual(2));
    expect(store.getActions()).toMatchObject([
      {
        meta: {
          arg: "2",
          requestId: expect.any(String),
          requestStatus: "pending",
        },
        payload: undefined,
        type: "users/fetchUser/pending",
      },
      {
        meta: {
          arg: "2",
          requestId: expect.any(String),
          requestStatus: "fulfilled",
        },
        payload: {
          pk: 2,
          email: "another@example.com",
          username: "Another User",
        },
        type: "users/fetchUser/fulfilled",
      },
    ]);
  });

  it("displays error messages", async () => {
    axios.get.mockRejectedValue(new Error("invalid userId"));

    store = mockStore({
      users: {
        data: {},
        loading: false,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/users/3"]}>
          <Routes>
            <Route path="/users/:userId" element={<Profile />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(axios.get).toHaveBeenCalledWith("/api/users/3/");
    await waitFor(() =>
      expect(screen.getByText("invalid userId")).toBeInTheDocument(),
    );
  });

  it("displays loading state while fetching user data", async () => {
    store = mockStore({
      users: {
        data: {},
        loading: true,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/users/3"]}>
          <Routes>
            <Route path="/users/:userId" element={<Profile />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  });
});
