import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.clarifai.com",
  headers: {
    Authorization: "Key bb4af14c8e6d4fe38268eafd2ffdf135",
  },
});
