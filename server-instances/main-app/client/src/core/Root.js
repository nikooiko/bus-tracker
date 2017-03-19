import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './configureStore';
import { addInterceptor } from '../utils/api';
import { unauthUser } from '../auth/store/actions';

// Add auth Interceptor
addInterceptor('response', (response) => response, (error) => {
  // Check if we got 401 in order to logout
  if (error && error.response && error.response.status === 401) {
    console.error('Got a 401. Logging out.');
    store.dispatch(unauthUser());
  }
  // just forward the error
  return Promise.reject(error);
});

const onUpdate = () => {
  window.scrollTo(0, 0);
};

export const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

// Render Provider >> Router
const Root = () => (
  <Provider store={store}>
    <Router history={history} routes={routes(store)} onUpdate={onUpdate}/>
  </Provider>
);

export default Root;
