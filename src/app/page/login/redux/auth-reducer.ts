import {AuthState} from "./model/auth-state";
import {AuthActions} from "./model/auth-actions";
import {AuthActionType} from "./model/auth-action-type";

const initialAuthState: AuthState = {
    initialized: false,
    isWrongCredentials: false,
}

const authReducer = (state: AuthState = initialAuthState, action: AuthActions): AuthState => {
    switch (action.type) {
        case AuthActionType.AUTH_START:
            return {
                ...state,
                initialized: true,
            };
        case AuthActionType.AUTH_SUCCESS:
            return {
                ...state,
                initialized: false,
                authorities: action.authorities,
                token: action.token,
                email: action.email,
                isWrongCredentials: false,
            };
        case AuthActionType.AUTH_FAILURE:
            return {
                ...state,
                failureReason: action.reason,
                initialized: false,
                isWrongCredentials: action.isWrongCredentials,
            };
    }

    return state;
};

export {authReducer};