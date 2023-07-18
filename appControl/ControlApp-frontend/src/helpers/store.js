/* eslint-disable default-param-last */
/* eslint-disable import/no-import-module-exports */
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { persistStore } from 'redux-persist';
import { createInjectorsEnhancer, forceReducerReload } from 'redux-injectors';
import createSagaMiddleware from 'redux-saga';
import createReducer from '../reducers';
const reduxLogger = require('redux-logger');

const configureNewStore = (initialState = {}, history) => {
    const composeEnhancers = compose;
    const reduxSagaMonitorOptions = {};

    const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
    const { run: runSaga } = sagaMiddleware;
    const middlewares = [sagaMiddleware, routerMiddleware(history)];

    const { logger } = reduxLogger;
    middlewares.push(logger);

    const enhancers = [
        applyMiddleware(...middlewares),
        createInjectorsEnhancer({
            createReducer,
            runSaga,
        }),
    ];

    const store = createStore(
        createReducer(),
        initialState,
        composeEnhancers(...enhancers),
    );

    /* istanbul ignore next */
    if (module.hot) {
        module.hot.accept('../reducers', () => {
            forceReducerReload(store);
        });
    }

    return store;
};

const configurePersistedStore = (initialState, history) => {
    const store = configureNewStore(initialState, history);
    const persistor = persistStore(store);
    return { store, persistor };
};

export default configureNewStore;
export { configurePersistedStore };
