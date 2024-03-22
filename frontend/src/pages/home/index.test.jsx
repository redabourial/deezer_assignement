import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter, useNavigate } from "react-router-dom";

import "@testing-library/jest-dom";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import axios from "axios";
import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";

import Home from "./index";

jest.mock("axios");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));
const mockStore = configureStore([thunk]);

describe("Home Component", () => {
  let store;
  let navigate;
  beforeEach(() => {
    store = mockStore({
      users: {
        data: {},
        error: null,
        loading: false,
      },
    });
    navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  it("handles form submission", async () => {
    axios.post.mockResolvedValue({
      data: {
        pk: 42,
        name: "Test User",
        email: "test@example.com",
      },
      status: 200,
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>,
    );

    await act(() => {
      fireEvent.change(screen.getByPlaceholderText("Name"), {
        target: {
          value: "Test User",
        },
      });
      fireEvent.change(screen.getByPlaceholderText("Email"), {
        target: {
          value: "test@example.com",
        },
      });
      fireEvent.click(screen.getByText("Register"));
    });

    await waitFor(() => expect(axios.post).toHaveBeenCalled());
    expect(store.getActions()).toMatchObject([
      {
        meta: {
          arg: {
            email: "test@example.com",
            name: "Test User",
          },
          requestId: expect.any(String),
          requestStatus: "pending",
        },
        payload: undefined,
        type: "users/createUser/pending",
      },
      {
        meta: {
          arg: {
            email: "test@example.com",
            name: "Test User",
          },
          requestId: expect.any(String),
          requestStatus: "fulfilled",
        },
        payload: {
          email: "test@example.com",
          name: "Test User",
          pk: 42,
        },
        type: "users/createUser/fulfilled",
      },
    ]);
    expect(navigate).toHaveBeenCalledWith("/users/42");
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      "/api/users/",
      {
        email: "test@example.com",
        name: "Test User",
      },
      {
        validateStatus: expect.any(Function),
      },
    );
    expect(axios.post).toHaveBeenCalledTimes(1);
  });

  it("handles form submission error (status code 400)", async () => {
    axios.post.mockResolvedValue({
      status: 400,
      data: {
        somekey: ["Invalid data"],
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>,
    );

    await act(() => {
      fireEvent.change(screen.getByPlaceholderText("Name"), {
        target: {
          value: "Test User",
        },
      });
      fireEvent.change(screen.getByPlaceholderText("Email"), {
        target: {
          value: "test@example.com",
        },
      });
      fireEvent.click(screen.getByText("Register"));
    });

    await waitFor(() => expect(axios.post).toHaveBeenCalled());
    expect(store.getActions()).toMatchObject([
      {
        meta: {
          arg: {
            email: "test@example.com",
            name: "Test User",
          },
          requestId: expect.any(String),
          requestStatus: "pending",
        },
        payload: undefined,
        type: "users/createUser/pending",
      },
      {
        meta: {
          arg: {
            email: "test@example.com",
            name: "Test User",
          },
          requestId: expect.any(String),
          requestStatus: "rejected",
        },
        payload: undefined,
        error: {
          message: "Invalid data",
        },
        type: "users/createUser/rejected",
      },
    ]);
  });

  it("Displays errors", async () => {
    store = mockStore({
      users: {
        data: {},
        error: "invalid something",
        loading: false,
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText("invalid something")).toBeInTheDocument();
  });

  it("Doesn't do anything when loading", async () => {
    store = mockStore({
      users: {
        data: {},
        error: null,
        loading: true,
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>,
    );

    await act(() => {
      fireEvent.change(screen.getByPlaceholderText("Name"), {
        target: {
          value: "Test User",
        },
      });
      fireEvent.change(screen.getByPlaceholderText("Email"), {
        target: {
          value: "test@example.com",
        },
      });
      fireEvent.click(screen.getByText("Register"));
    });

    expect(store.getActions()).toMatchObject([]);
    expect(navigate).toHaveBeenCalledTimes(0);
    expect(axios.post).toHaveBeenCalledTimes(0);
  });
});
