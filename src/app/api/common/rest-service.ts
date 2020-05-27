import axios, {AxiosInstance} from "axios";
import {AuthService} from "../../services/auth-service";
import {navigationService} from "../../services/navigation-service";
import {ErrorMessage} from "./error-message";


class RestService {

    private readonly axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create(({
            baseURL: `/api`,
        }));

        this.axiosInstance.interceptors.request.use(
            request => {
                const token: string | undefined = AuthService.getAccessToken();

                if (token) {
                    request.headers.Authorization = `Bearer ${token}`;
                }
                return request;
            }
        );

        this.axiosInstance.interceptors.response.use(
            response => response.data,
            error => {
                if (error.response.status === 401 && !error.response.request.responseURL.includes("login")) {
                    navigationService.redirectToLogin();
                }
                console.log(error);
                if(error.response.status === 400){
                    const errorToDisplay: ErrorMessage = {
                        status: error.response.status,
                        message: error.response.message
                        ? error.response.message
                        : error.response.data.message,
                    };
                    return Promise.reject(errorToDisplay);
                }
                const errorToDisplay: ErrorMessage = {
                    status: error.response.status,
                    message: `Sistemos klaida. (Klaidos kodas: ${error.response.status})`,
                };
                return Promise.reject(errorToDisplay);
            }
        )
    }

    public get<T>(url: string): Promise<T> {
        return this.axiosInstance.get(url);
    }

    public post<T>(url: string, data?: Object): Promise<T> {
        return this.axiosInstance.post(url, data);
    }

    public put<T>(url: string, data?: Object): Promise<T> {
        return this.axiosInstance.put(url, data);
    }

    public delete<T>(url: string): Promise<T> {
        return this.axiosInstance.delete(url);
    }
}

const restService = new RestService();

export {restService, RestService}