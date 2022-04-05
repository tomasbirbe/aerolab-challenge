import api from "../../apiKey";
import { Product, User } from "../types";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${api.key}`,
};

export default {
  getProducts: (): Promise<Product[]> => {
    return fetch(`https://coding-challenge-api.aerolab.co/products`, {
      method: "GET",
      headers,
    }).then((data) => data.json());
  },
  getUser: (): Promise<User> => {
    return fetch(`https://coding-challenge-api.aerolab.co/user/me`, {
      method: "GET",
      headers,
    }).then((data) => data.json());
  },
};
