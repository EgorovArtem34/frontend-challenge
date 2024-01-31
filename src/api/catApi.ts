import axios from "axios";

const APIKey = import.meta.env.VITE__CAT_API_KEY;
const headers = {
  "x-api-key": APIKey,
  "Content-Type": "application/json",
};
const baseURL = "https://api.thecatapi.com/v1";

const CatClient = axios.create({
  baseURL,
  timeout: 1000,
  headers,
});

export const fetchCats = async (params = {}) => {
  const response = await CatClient.get("/images/search", { params });
  return response?.data;
};
