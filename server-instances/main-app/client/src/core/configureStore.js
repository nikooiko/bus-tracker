import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { responsiveStoreEnhancer } from 'redux-responsive';
import reducers from './reducers';
import { loadState as localStorageLoad, saveState as localStorageSave } from './localStorage';
import { loadState as sessionStorageLoad, saveState as sessionStorageSave } from './sessionStorage';
import api from '../utils/api';

const configureStore = () => {
  const sessionStorageState = sessionStorageLoad();
  const localStorageState = localStorageLoad();
  let persistedState =
    (sessionStorageState && sessionStorageState.auth ? sessionStorageState : false) ||
    (localStorageState && localStorageState.auth ? localStorageState : false);
  if (!persistedState) {
    persistedState = {};
  }

  const reduxRouter = routerMiddleware(browserHistory);
  const middlewares = [
    reduxRouter,
    thunk,
    promise,
    process.env.NODE_ENV !== 'production' && createLogger()
  ].filter(Boolean);

  const enhancer = compose(
    responsiveStoreEnhancer,
    applyMiddleware(...middlewares),
  );
  // finally create store and apply the middlewares
  const store = createStore(reducers, persistedState, enhancer);
  // Required for replaying actions from devtools to work
  // reduxRouter.listenForReplays(store);

  // load auth token if exists
  if (store.getState().auth.authenticated){
    api.setAuthenticationHeader(store.getState().auth.user.accessToken);
  }

  store.subscribe(throttle(() => {
    const state = store.getState();
    const auth = state.auth;
    if (auth.rememberMe || !auth.authenticated) {
      localStorageSave({
        auth
      });
    }
    sessionStorageSave({
      auth
    });
  }, 1000));

  return store;
};

export default configureStore
