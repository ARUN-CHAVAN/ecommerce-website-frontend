import axios from "axios";

const BASE_URL = "http://localhost:8082";

export const getAllProducts = () =>
  axios.get(`${BASE_URL}/products`).then((res) => res.data);
export const getUserByEmail = (email) =>
  axios.get(`${BASE_URL}/users/email/${email}`).then((res) => res.data);
export const addUser = (user) =>
  axios.post(`${BASE_URL}/users`, user).then((res) => res.data);

export const addToCart = (userId, productId) =>
  axios.post(`${BASE_URL}/cart`, { userId, productId ,quantity: 1}).then((res) => res.data);

export const getCartByUser = (userId) =>
  axios.get(`${BASE_URL}/cart/${userId}`).then((res) => res.data);
export const removeCartItem = (cartId) =>
  axios.delete(`${BASE_URL}/cart/${cartId}`).then((res) => res.data);
export const clearCart=(userId)=>axios.delete(`${BASE_URL}/cart/user/${userId}`);

export const placeOrder = () => {
  const token = localStorage.getItem("token");
  return axios.post(`${BASE_URL}/orders`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getOrdersByUser = () => {
  const token = localStorage.getItem("token");

  return axios.get(`${BASE_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.data);
};

export const decreaseCart = (userId, productId) => {
  return axios.put(`${BASE_URL}/cart/decrease`, null, {
    params: { userId, productId },
  }).then((res) => res.data);
};
export const loginUser = (email, password) =>
  axios.post(`${BASE_URL}/auth/login`, { email, password })
       .then((res) => res.data);
