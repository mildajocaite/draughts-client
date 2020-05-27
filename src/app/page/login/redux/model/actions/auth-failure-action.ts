import {Action} from "redux";
import {AuthActionType} from "../auth-action-type";

export interface AuthFailureAction extends Action<typeof AuthActionType.AUTH_FAILURE> {
    reason: string;
    isWrongCredentials: boolean;
}