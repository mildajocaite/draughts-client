import {FormStateMap} from "redux-form";
import {RouterState} from "connected-react-router";
import {AuthState} from "../../page/login/redux/model/auth-state";
import {PersistPartial} from 'redux-persist/lib/persistReducer'
import {TaskState} from "../../page/task/redux/model/task-state";

export interface RootState {
    router: RouterState;
    form: FormStateMap;
    auth: AuthState & PersistPartial;
    task: TaskState;
}
