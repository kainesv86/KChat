import axios from "axios";
import { store } from "../store";
import { apiActions } from "../store/api";

const axiosClient = axios.create({ baseURL: "http://localhost:4000/", withCredentials: true });

axiosClient.interceptors.response.use(function (response) {
        if (response?.data?.details?.message) store.dispatch(apiActions.resetState());
        return response;
});

export default axiosClient;
