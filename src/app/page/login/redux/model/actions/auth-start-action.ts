import {Action} from "redux";
import {AuthActionType} from "../auth-action-type";

export interface AuthStartAction extends Action<typeof AuthActionType.AUTH_START> {
}