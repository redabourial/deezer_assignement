import { createUser, getUser } from "/src/api/users";
import { registerUser, fetchUser } from "./usersSlice";

jest.mock("/src/api/users", () => ({
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

        expect(dispatch).toHaveBeenCalledWith({ "meta": { "arg": { "email": "test@example.com", "name": "Test User" }, "requestId": expect.any(String), "requestStatus": "fulfilled" }, "payload": { "email": "test@example.com", "name": "Test User", "pk": 1 }, "type": "users/createUser/fulfilled" });
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
    
        expect(dispatch).toHaveBeenCalledWith({"meta": {"arg": {"email": "test@example.com", "name": "Test User"}, "requestId": expect.any(String), "requestStatus": "pending"}, "payload": undefined, "type": "users/createUser/pending"});
        expect(dispatch).toHaveBeenCalledTimes(2);
      });
});

describe("fetchUser", () => {
  it("should dispatch fetchUser.pending and fetchUser.fulfilled actions on successful user retrieval", async () => {
    const mockUserId = 1;
    const mockUser = { pk: mockUserId, name: "Test User", email: "test@example.com" };
    const mockResponse = { data: mockUser, status: 200 };

    getUser.mockResolvedValue(mockResponse);

    const dispatch = jest.fn();
    const getState = jest.fn();

    await fetchUser(mockUserId)(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith({"meta": {"arg": 1, "requestId": expect.any(String), "requestStatus": "fulfilled"}, "payload": {"email": "test@example.com", "name": "Test User", "pk": 1}, "type": "users/fetchUser/fulfilled"});        
    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  it("should dispatch fetchUser.pending and fetchUser.rejected actions on failed user retrieval", async () => {
    const mockUserId = 1;
    const mockResponse = { status: 404 };

    getUser.mockResolvedValue(mockResponse);

    const dispatch = jest.fn();
    const getState = jest.fn();

    await fetchUser(mockUserId)(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith( {"meta": {"arg": 1, "requestId": expect.any(String),  "requestStatus": "pending"}, "payload": undefined, "type": "users/fetchUser/pending"});        
    expect(dispatch).toHaveBeenCalledTimes(2);
  });
});

