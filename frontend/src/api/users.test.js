import axios from "axios";

import { createUser, getUser, validateStatus } from "./users";

jest.mock("axios");

describe("YourFile", () => {
  describe("validateStatus function", () => {
    it("should return true for status less than 500", () => {
      expect(validateStatus(200)).toBe(true);
      expect(validateStatus(400)).toBe(true);
    });

    it("should return false for status greater than or equal to 500", () => {
      expect(validateStatus(500)).toBe(false);
      expect(validateStatus(600)).toBe(false);
    });
  });

  describe("createUser function", () => {
    it("should make a post request to create user", async () => {
      const user = { name: "some name", email: "r@example.com" };
      const responseData = { id: 1, ...user };
      axios.post.mockResolvedValueOnce({ data: responseData });

      const response = await createUser(user);
      expect(axios.post).toHaveBeenCalledWith(
        "/api/users/",
        { email: "r@example.com", name: "some name" },
        { validateStatus },
      );
      expect(response).toEqual({ data: responseData });
    });
  });

  describe("getUser function", () => {
    it("should make a get request to fetch user", async () => {
      const userId = 1;
      const responseData = {
        id: userId,
        name: "some name",
        email: "r@example.com",
      };
      axios.get.mockResolvedValueOnce({ data: responseData });

      const response = await getUser(userId);

      expect(axios.get).toHaveBeenCalledWith("/api/users/1/");
      expect(response).toEqual({ data: responseData });
    });
  });
});
