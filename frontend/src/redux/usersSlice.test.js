import { createUser, getUser } from "/src/api/users";

import { extraReducers, fetchUser, registerUser } from "./usersSlice";

jest.mock("/src/api/users", () => ({
  ...jest.requireActual("/src/api/users"),
  createUser: jest.fn(),
  getUser: jest.fn(),
}));

describe("registerUser", () => {
  it("should dispatch registerUser.fulfilled actions on successful registration", async () => {
    const mockUser = { name: "Test User", email: "test@example.com" };
    const mockResponse = { data: { pk: 1, ...mockUser }, status: 200 };

    createUser.mockResolvedValue(mockResponse);

    const dispatch = jest.fn();
    const getState = jest.fn();

    await registerUser(mockUser)(dispatch, getState);

    expect(dispatch.mock.calls).toMatchObject([
      [
        {
          meta: {
            arg: { email: "test@example.com", name: "Test User" },
            requestId: expect.any(String),
            requestStatus: "pending",
          },
          payload: undefined,
          type: "users/createUser/pending",
        },
      ],
      [
        {
          meta: {
            arg: { email: "test@example.com", name: "Test User" },
            requestId: expect.any(String),
            requestStatus: "fulfilled",
          },
          payload: {
            time_to_query: expect.any(Number),
            email: "test@example.com",
            name: "Test User",
            pk: 1,
          },
          type: "users/createUser/fulfilled",
        },
      ],
    ]);
  });

  it("should dispatch registerUser.rejected actions on failed registration", async () => {
    const mockUser = { name: "Test User", email: "test@example.com" };
    const mockError = "Email already exists";
    const mockResponse = { data: { email: [mockError] }, status: 400 };

    createUser.mockResolvedValue(mockResponse);

    const dispatch = jest.fn();
    const getState = jest.fn();

    await registerUser(mockUser)(dispatch, getState);

    expect(dispatch.mock.calls).toMatchObject([
      [
        {
          meta: {
            arg: { email: "test@example.com", name: "Test User" },
            requestId: expect.any(String),
            requestStatus: "pending",
          },
          payload: undefined,
          type: "users/createUser/pending",
        },
      ],
      [
        {
          error: { message: expect.any(String) },
          meta: {
            aborted: false,
            arg: { email: "test@example.com", name: "Test User" },
            condition: false,
            rejectedWithValue: false,
            requestId: expect.any(String),
            requestStatus: "rejected",
          },
          payload: undefined,
          type: "users/createUser/rejected",
        },
      ],
    ]);
  });
});

describe("fetchUser", () => {
  it("should dispatch fetchUser.fulfilled actions on successful user retrieval", async () => {
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

    await fetchUser(mockUserId)(dispatch, getState);

    expect(dispatch.mock.calls).toMatchObject([
      [
        {
          meta: {
            arg: 1,
            requestId: expect.any(String),
            requestStatus: "pending",
          },
          payload: undefined,
          type: "users/fetchUser/pending",
        },
      ],
      [
        {
          meta: {
            arg: 1,
            requestId: expect.any(String),
            requestStatus: "fulfilled",
          },
          payload: { email: "test@example.com", name: "Test User", pk: 1 },
          type: "users/fetchUser/fulfilled",
        },
      ],
    ]);
  });

  it("should dispatch fetchUser.pending and fetchUser.rejected actions on failed user retrieval", async () => {
    const mockUserId = 1;
    const mockResponse = { status: 404 };

    getUser.mockResolvedValue(mockResponse);

    const dispatch = jest.fn();
    const getState = jest.fn();

    await fetchUser(mockUserId)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      meta: { arg: 1, requestId: expect.any(String), requestStatus: "pending" },
      payload: undefined,
      type: "users/fetchUser/pending",
    });

    expect(dispatch.mock.calls).toMatchObject([
      [
        {
          meta: {
            arg: 1,
            requestId: expect.any(String),
            requestStatus: "pending",
          },
          payload: undefined,
          type: "users/fetchUser/pending",
        },
      ],
      [
        {
          error: { message: expect.any(String) },
          meta: {
            aborted: false,
            arg: 1,
            condition: false,
            rejectedWithValue: false,
            requestId: expect.any(String),
            requestStatus: "rejected",
          },
          payload: undefined,
          type: "users/fetchUser/rejected",
        },
      ],
    ]);
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
      data: {},
    };
    extraReducers(builder);
  });

  it("registerUser.fulfilled", () => {
    const [_, fulfilledCallback] = builder.addCase.mock.calls.find(
      (c) => c[0].type === "users/createUser/fulfilled",
    );
    const payload = { pk: 1, name: "r" };
    fulfilledCallback(state, { payload });
    expect(state.data[payload.pk]).toEqual(payload);
  });

  it("fetchUser.fulfilled", () => {
    const [_, fulfilledCallback] = builder.addCase.mock.calls.find(
      (c) => c[0].type === "users/fetchUser/fulfilled",
    );
    const payload = { pk: 1, name: "r" };
    fulfilledCallback(state, { payload });
    expect(state.data[payload.pk]).toEqual(payload);
  });
});
