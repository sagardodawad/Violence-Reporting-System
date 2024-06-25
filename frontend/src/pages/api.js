/** @format */

import axios from "axios";
export const API_BASE_URL = "http://localhost:8081";

const jwt = localStorage.getItem("token");

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${jwt}`,
  },
});
