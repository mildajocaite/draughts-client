import {applyMiddleware, createStore, Middleware, Reducer, Store, StoreEnhancer} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {routerMiddleware} from 'connected-react-router';
import {persistReducer} from 'redux-persist';
import {PersistPartial} from 'redux-persist/lib/persistReducer';

import {rootPersistConfig} from './store-config';
import {RootState} from "../state/root-state";
import {rootReducer} from "../reducers/root-reducer";
import {history} from "../../services/navigation-service";

function configureStore(initialState?: RootState & PersistPartial): Store<RootState> {
    const mainMiddleware: StoreEnhancer = configureMiddleware();
    const reducer: Reducer<RootState & PersistPartial> = configurePersistReducer();

    return createStore(reducer, initialState, mainMiddleware);
}

function configureMiddleware(): StoreEnhancer {
    const historyMiddleware: Middleware = routerMiddleware(history);

    return composeWithDevTools(
        applyMiddleware(
            thunkMiddleware,
            historyMiddleware,
        ),
    );
}

function configurePersistReducer(): Reducer<RootState & PersistPartial> {
    return persistReducer(rootPersistConfig, rootReducer(history));
}

const store: Store<RootState> = configureStore();

export {store};
