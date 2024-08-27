import axios from 'axios';

const API_URL = 'http://localhost:4000';

export const signUp = async (user) => {
  const response = await axios.post(`${API_URL}/auth/signup`, user);
  return response.data;
};

export const signIn = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/signin`, credentials);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axios.get(`${API_URL}/auth/whoami`);
  return response.data;
};

export const signOut = async () => {
  await axios.post(`${API_URL}/auth/signout`);
};

export const getUserById = async (id) => {
  const response = await axios.get(`${API_URL}/auth/${id}`);
  return response.data;
};

export const getUsersByEmail = async (email) => {
  const response = await axios.get(`${API_URL}/auth`, { params: { email } });
  return response.data;
};

export const deleteUserById = async (id) => {
  await axios.delete(`${API_URL}/auth/${id}`);
};

export const updateUserById = async (id, data) => {
  const response = await axios.patch(`${API_URL}/auth/${id}`, data);
  return response.data;
};
