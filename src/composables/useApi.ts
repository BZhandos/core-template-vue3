import { API } from "@/api";

export function useApi() {
  const $API = new API({
    baseUrl: import.meta.env.VITE_APP_API_URL,
  });
  return $API;
}
