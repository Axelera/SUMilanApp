import React from 'react';
import ReactDOM from 'react-dom';
import { createClient, Provider } from 'urql';
import { Provider as StoreProvider } from 'react-redux'

import App from './app/App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { store } from './app/store/store';
import { AuthProvider } from './app/contexts/Auth';

const client = createClient({
  url: process.env['NX_SUPABASE_GRAPHQL_ENDPOINT'] as string,
  fetchOptions: () => ({
    headers: {
      apikey: process.env['NX_SUPABASE_PUBLIC_KEY'] as string,
    },
  })
});

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <AuthProvider>
        <Provider value={client}>
          <App />
        </Provider>
      </AuthProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();