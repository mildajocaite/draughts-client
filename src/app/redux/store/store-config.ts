import sessionStorage from 'redux-persist/lib/storage/session';
import {PersistConfig} from 'redux-persist/lib/types';
import {RootState} from "../state/root-state";
import {AuthState} from "../../page/login/redux/model/auth-state";

const rootPersistConfig: PersistConfig<RootState> = {
    key: 'root',
    storage: sessionStorage,
    blacklist: [
        'router',
        'form',
        'auth',
    ],
};

const authConfig: PersistConfig<AuthState> = {
    key: 'auth',
    storage: sessionStorage,
    blacklist: [
        'isWrongCredentials',
        'failureReason',
    ]
};

export {rootPersistConfig, authConfig};