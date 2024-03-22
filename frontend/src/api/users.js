import axios from "axios";

export const validateStatus = (s) => s < 500;

export const createUser = (user) => {
  return axios.post(`${api.root}/users/`, user, { validateStatus });
};

export const getUser = (userId) => {
  return axios.get(`${api.root}/users/${userId}/`);
};
