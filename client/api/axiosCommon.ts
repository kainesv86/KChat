import axios, { AxiosError } from "axios";
import { ServerResponse } from "../common/interface/api.interface";
import { store } from "../store";
import { apiActions } from "../store/api";

const axiosClient = axios.create({ baseURL: "http://localhost:4000/", withCredentials: true });

axiosClient.interceptors.response.use(
        function (response) {
                if (response?.data?.details?.message) store.dispatch(apiActions.resetState());
                return response;
        },
        function (error: AxiosError<ServerResponse<null>>) {
                store.dispatch(apiActions.resetState());
                if (error.response?.status) store.dispatch(apiActions.updateErrorDetails(error.response.data.details));

                return Promise.reject(error.message);
        }
);

export default axiosClient;
