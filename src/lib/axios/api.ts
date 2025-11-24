import { useUserStore } from "@/src/app/store/userStore";
import axios from "axios";

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL_SERVER}/api/proxy`,
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // chama a api do next para renovar os tokens
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_SERVER}/api/auth/refresh`, { method: "POST" });
        // await axios.post("/api/auth/refresh");

        // tenta novamente a requisição que deu errado anteriormente
        return api(originalRequest);

      } catch (refreshError) {
        // Se falhar, desloga o usuário
        useUserStore.getState().clearUser();
        if (typeof window !== "undefined") {
          window.location.href = "/";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);