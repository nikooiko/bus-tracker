import api from '../../utils/api';
import { routerActions } from 'react-router-redux';

import { AUTH_USER, UNAUTH_USER } from './types';
import { routeAfterAuth, routeAfterUnauth } from '../authConfig';
import { showToast } from '../../toast/store/actions';

// Sync Action Creators
export const authUser = (rememberMe, user) => {
  return { type: AUTH_USER, rememberMe, user };
};

export const unauthUser = () => {
  return { type: UNAUTH_USER };
};


// Async Action Creators
export const login = (credentials) => {
  return (dispatch) => {
    // Use functionality for explicit role login (as admin)
    credentials.loginAsRole = 'admin';
    return api.post('/AppUsers/login', credentials)
      .then(response => {
        const rememberMe = credentials.rememberMe;
        const accessToken = response.data.id;
        const isAdmin = (response.data.roles.indexOf('admin') !== -1);
        api.setAuthenticationHeader(accessToken); // add before check if admin in order to logout.
        if (!isAdmin) {
          // Logout because this dashboard is made only for admin.
          dispatch(logout());
          return Promise.reject('notAdminError');
        }
        const user = {
          id: response.data.userId,
          username: credentials.username,
          isAdmin,
          accessToken
        };
        dispatch(authUser(rememberMe, user));
        dispatch(routerActions.push(routeAfterAuth));
      })
      .catch((err) => {
        let customError = null;
        if (err && err.response && err.response.data) customError = err.response.data.error;
        if (err === 'notAdminError' || (customError && customError.code === 'notAdminError')) {
          dispatch(showToast({
            message: 'You are not administrator. Access denied!',
            status: 'critical'
          }));
        } else {
          const message = 'Wrong password. Try again.';
          dispatch(showToast({
            message,
            status: 'critical'
          }));
        }
      });
  }
};

export const logout = () => {
  return (dispatch, getState) => {
    return api.post('/AppUsers/logout')
      .catch(() => null)
      .then(() => {
        api.setAuthenticationHeader(null);
        if (getState().auth.authenticated) { // if was authenticated.
          dispatch(unauthUser());
          dispatch(routerActions.push(routeAfterUnauth));
        }
      });
  }
};
