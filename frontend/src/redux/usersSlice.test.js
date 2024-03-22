import { createUser, getUser } from "/src/api/users";

import { extraReducers, fetchUser, registerUser } from "./usersSlice";

jest.mock("/src/api/users", () => ({
  ...jest.requireActual("/src/api/users"),
  createUser: jest.fn(),
  getUser: jest.fn(),
}));

describe("registerUser", () => {
  it("should dispatch registerUser.pending and registerUser.fulfilled actions on successful registration", async () => {
    const mockUser = { name: "Test User", email: "test@example.com" };
    const mockResponse = { data: { pk: 1, ...mockUser }, status: 200 };

    createUser.mockResolvedValue(mockResponse);

    const dispatch = jest.fn();
    const getState = jest.fn();

    await registerUser(mockUser)(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith({
      meta: {
        arg: { email: "test@example.com", name: "Test User" },
        requestId: expect.any(String),
        requestStatus: "fulfilled",
      },
      payload: { email: "test@example.com", name: "Test User", pk: 1 },
      type: "users/createUser/fulfilled",
    });
    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  it("should dispatch registerUser.pending and registerUser.rejected actions on failed registration", async () => {
    const mockUser = { name: "Test User", email: "test@example.com" };
    const mockError = "Email already exists";
    const mockResponse = { data: { email: [mockError] }, status: 400 };

    createUser.mockResolvedValue(mockResponse);

    const dispatch = jest.fn();
    const getState = jest.fn();

    await registerUser(mockUser)(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith({
      meta: {
        arg: { email: "test@example.com", name: "Test User" },
        requestId: expect.any(String),
        requestStatus: "pending",
      },
      payload: undefined,
      type: "users/createUser/pending",
    });
    expect(dispatch).toHaveBeenCalledTimes(2);
  });
});

describe("fetchUser", () => {
  it("should dispatch fetchUser.pending and fetchUser.fulfilled actions on successful user retrieval", async () => {
    const mockUserId = 1;
    const mockUser = {
      pk: mockUserId,
      name: "Test User",
      email: "test@example.com",
    };
    const mockResponse = { data: mockUser, status: 200 };

    getUser.mockResolvedValue(mockResponse);

    const dispatch = jest.fn();
    const getState = jest.fn();

    await fetchUser(mockUserId)(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith({
      meta: {
        arg: 1,
        requestId: expect.any(String),
        requestStatus: "fulfilled",
      },
      payload: { email: "test@example.com", name: "Test User", pk: 1 },
      type: "users/fetchUser/fulfilled",
    });
    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  it("should dispatch fetchUser.pending and fetchUser.rejected actions on failed user retrieval", async () => {
    const mockUserId = 1;
    const mockResponse = { status: 404 };

    getUser.mockResolvedValue(mockResponse);

    const dispatch = jest.fn();
    const getState = jest.fn();

    await fetchUser(mockUserId)(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith({
      meta: { arg: 1, requestId: expect.any(String), requestStatus: "pending" },
      payload: undefined,
      type: "users/fetchUser/pending",
    });
    expect(dispatch).toHaveBeenCalledTimes(2);
  });
});

describe("extraReducers", () => {
  let builder;
  let state;

  beforeEach(() => {
    builder = {
      addCase: jest.fn().mockImplementation(() => builder),
    };
    state = {
      error: null,
      loading: false,
      data: {},
    };
    extraReducers(builder);
  });

  it("registerUser.pending", () => {
    const [_, pendingCallback] = builder.addCase.mock.calls.find(
      (c) => c[0].type === "users/createUser/pending",
    );
    pendingCallback(state);
    expect(state.error).toBe(null);
    expect(state.loading).toBe(true);
  });

  it("registerUser.fulfilled", () => {
    const [_, fulfilledCallback] = builder.addCase.mock.calls.find(
      (c) => c[0].type === "users/createUser/fulfilled",
    );
    const payload = { pk: 1, name: "r" };
    fulfilledCallback(state, { payload });
    expect(state.loading).toBe(false);
    expect(state.data[payload.pk]).toEqual(payload);
  });

  it("registerUser.rejected", () => {
    const [_, rejectedCallback] = builder.addCase.mock.calls.find(
      (c) => c[0].type === "users/createUser/rejected",
    );
    const error = { message: "Error message" };
    rejectedCallback(state, { error });
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error.message);
  });

  it("fetchUser.pending", () => {
    const [_, pendingCallback] = builder.addCase.mock.calls.find(
      (c) => c[0].type === "users/fetchUser/pending",
    );
    pendingCallback(state);
    expect(state.error).toBe(null);
    expect(state.loading).toBe(true);
  });

  it("fetchUser.fulfilled", () => {
    const [_, fulfilledCallback] = builder.addCase.mock.calls.find(
      (c) => c[0].type === "users/fetchUser/fulfilled",
    );
    const payload = { pk: 1, name: "r" };
    fulfilledCallback(state, { payload });
    expect(state.loading).toBe(false);
    expect(state.data[payload.pk]).toEqual(payload);
  });

  it("fetchUser.rejected", () => {
    const [_, rejectedCallback] = builder.addCase.mock.calls.find(
      (c) => c[0].type === "users/fetchUser/rejected",
    );
    const error = { message: "Error message" };
    rejectedCallback(state, { error });
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error.message);
  });
});
