import {store} from "../redux/store/store";
import {Authority} from "../page/login/redux/model/auth-state";
import {Action} from "redux";
import {navigationService} from "./navigation-service";

export class AuthService {

    public static getAccessToken(): string | undefined {
        return store.getState().auth.token;
    }

    public static getRoles(): Authority[] | undefined {
        return store.getState().auth.authorities;
    }

    public static getEmail(): string | undefined {
        return store.getState().auth.email;
    }

    public static logout(): void {
        const logoutAction: Action = {
            type: "LOGOUT"
        };
        store.dispatch(logoutAction);
        navigationService.redirectToLogin();
    }
}