import axios from "axios";
import { store } from "../store";

const axiosClient = axios.create({ baseURL: "http://localhost:4000/", withCredentials: true });

// axiosClient.interceptors.response.use(
//     function (response) {
//         if (response?.data?.details?.message) store.
//     }
// )

export default axiosClient;
