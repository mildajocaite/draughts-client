import {Dispatch} from "redux";
import {AuthStartAction} from "./model/actions/auth-start-action";
import {AuthActionType} from "./model/auth-action-type";
import {RootState} from "../../../redux/state/root-state";
import {LoginFormModel} from "../model/LoginFormModel";
import {getFormValues} from "redux-form";
import {authService} from "../../../api/service/auth-service";
import {AuthSuccessAction} from "./model/actions/auth-succes-action";
import {AuthFailureAction} from "./model/actions/auth-failure-action";
import {navigationService} from "../../../services/navigation-service";

export const authorizeUser = () => (dispatch: Dispatch, getState: () => RootState) => {
    const startAction: AuthStartAction = {
        type: AuthActionType.AUTH_START
    };

    dispatch(startAction);

    const rootState: RootState = getState();

    const loginFormData: LoginFormModel = getFormValues('login')(rootState) as any;

    return authService.login(loginFormData)
        .then(response => {
            const successAction: AuthSuccessAction = {
                type: AuthActionType.AUTH_SUCCESS,
                authorities: response.authorities,
                email: response.email,
                token: response.token,
            };
            dispatch(successAction);
            navigationService.redirectToHomePage();
        })
        .catch(reason => {
                const failureAction: AuthFailureAction = {
                    type: AuthActionType.AUTH_FAILURE,
                    reason: reason,
                    isWrongCredentials: reason.status === 401,
                };
                dispatch(failureAction);
            }
        );
};