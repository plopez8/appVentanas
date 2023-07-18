import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import App from 'views/App';
import { ConnectedRouter } from 'connected-react-router';
import history from './services/history';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/animate.min.css';
import './assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0';
import './assets/css/demo.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { configurePersistedStore } from './helpers/store';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Create redux store with history
const { store, persistor } = configurePersistedStore({}, history);

async function render() {
    console.log("index.js");
    root.render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ConnectedRouter history={history}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </ConnectedRouter>
            </PersistGate>
        </Provider>,
    )  
}
  render()
