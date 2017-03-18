import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './configureStore';

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