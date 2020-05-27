import {AuthStartAction} from "./actions/auth-start-action";
import {AuthFailureAction} from "./actions/auth-failure-action";
import {AuthSuccessAction} from "./actions/auth-succes-action";

export type AuthActions = AuthStartAction
    | AuthSuccessAction
    | AuthFailureAction;