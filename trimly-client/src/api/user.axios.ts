import axios from "axios"

export const userAxiosInstance = axios.create({
   baseURL: import.meta.env.VITE_PRIVATE_API_URL,
   withCredentials: true
})