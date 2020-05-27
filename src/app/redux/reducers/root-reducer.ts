import {combineReducers, Reducer} from "redux";
import {RootActions} from "../actions/root-actions";
import {RootState} from "../state/root-state";
import {reducer as formReducer} from "redux-form";
import {connectRouter} from 'connected-react-router'
import {History} from "history";
import {authReducer} from "../../page/login/redux/auth-reducer";
import {persistReducer} from "redux-persist";
import {authConfig} from "../store/store-config";
import {taskReducer} from "../../page/task/redux/task-reducer";

const appReducer = (history: History): Reducer<RootState, RootActions> => combineReducers<RootState>({
        router: connectRouter(history),
        form: formReducer,
        auth: persistReducer(authConfig, authReducer),
        task: taskReducer,
    }
);

const rootReducer = (history: History): Reducer<RootState, RootActions> => {
    const createAppReducer = appReducer(history);
    return (state: RootState | undefined, action: RootActions) => {
        if (action.type === 'LOGOUT' && state) {
            const newState: RootState = {
                ...state,
                auth: {
                    ...state.auth,
                    failureReason: undefined,
                    token: undefined,
                    isWrongCredentials: false,
                    initialized: false,
                    email: undefined,
                    authorities: undefined,
                },
            };
            createAppReducer(newState, action);
        }
        return createAppReducer(state, action);
    }
};

export {rootReducer}