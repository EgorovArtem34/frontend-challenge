import { ICat } from "@/store/types";
import axios from "axios";

const APIKey = import.meta.env.VITE__CAT_API_KEY;
const headers = {
  "Content-Type": "application/json",
  "x-api-key": APIKey,
};
const baseURL = "https://api.thecatapi.com/v1";

const CatClient = axios.create({
  baseURL,
  timeout: 20000,
  withCredentials: false,
  headers,
});

export const fetchCats = async (params = {}): Promise<ICat[]> => {
  const response = await CatClient.get("/images/search", { params });
  return response?.data;
};
