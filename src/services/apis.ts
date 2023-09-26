import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const HolidaysApi = axios.create({
  baseURL: "https://date.nager.at/api/v3/publicholidays/2023/BR",
  headers: {
    "Content-Type": "application/json",
  },
});
