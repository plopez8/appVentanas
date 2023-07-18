/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import history from './services/history';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
    const persistConfig = {
        key: 'frontend',
        storage,
        version: 0,
        whitelist: [],
        timeout: null,
    };

    return persistReducer(
        persistConfig,
        combineReducers({
            router: connectRouter(history),
            ...injectedReducers,
        }),
    );
}
