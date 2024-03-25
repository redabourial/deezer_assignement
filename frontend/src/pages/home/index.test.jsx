import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter, useNavigate } from "react-router-dom";

import "@testing-library/jest-dom";
import { setGlobal } from "/src/setupTests";
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
    setGlobal();
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
    jest.resetAllMocks();
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
        username: "Test User",
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
            username: "Test User",
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
            username: "Test User",
          },
          requestId: expect.any(String),
          requestStatus: "fulfilled",
        },
        payload: {
          pk: 42,
          email: "test@example.com",
          username: "Test User",
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
        username: "Test User",
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
            username: "Test User",
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
            username: "Test User",
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
    axios.post.mockResolvedValue({
      status: 400,
      data: {
        somekey: ["Invalid something"],
      },
    });

    store = mockStore({
      users: {
        data: {},
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
    expect(screen.getByText("Invalid something")).toBeInTheDocument();
  });

  it("does nothing when loading", async () => {
    const user = {
      data: {
        pk: 42,
        username: "Test User",
        email: "test@example.com",
      },
      status: 200,
    };
    axios.post.mockReturnValue(
      new Promise((r) => setTimeout(() => r(user), 200)),
    );

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

    await act(async () => {
      fireEvent.click(screen.getByText("Register"));
      await new Promise((r) => setTimeout(r, 200));
    });

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(store.getActions()).toMatchObject([
      {
        meta: {
          arg: {
            email: "test@example.com",
            username: "Test User",
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
            username: "Test User",
          },
          requestId: expect.any(String),
          requestStatus: "fulfilled",
        },
        payload: {
          email: "test@example.com",
          pk: 42,
          time_to_query: expect.any(Number),
          username: "Test User",
        },
        type: "users/createUser/fulfilled",
      },
    ]);
  });
});
