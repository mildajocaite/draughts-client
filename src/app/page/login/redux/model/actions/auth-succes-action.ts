import {Action} from "redux";
import {AuthActionType} from "../auth-action-type";
import {Authority} from "../auth-state";

export interface AuthSuccessAction extends Action<typeof AuthActionType.AUTH_SUCCESS> {
    token: string;
    email: string;
    authorities: Authority[];
}