import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux'
import { createResponsiveStateReducer } from 'redux-responsive';
import sidebar from '../dashboard/navigation/sidebar/store/sidebarReducers';
import auth from '../auth/store/authReducers';
import { UNAUTH_USER } from '../auth/store/authTypes';
import busRoutes from '../dashboard/bus-routes/store/routesReducers';
import toast from '../toast/store/toastReducers';
import api from '../utils/api';

const customBreakPoints = {
  palm: 719,
  lapAndUp: 1023
};

const appReducer = combineReducers({
  browser: createResponsiveStateReducer(customBreakPoints, { infinity: 'desktop' }),
  form,
  routing,
  sidebar,
  auth,
  busRoutes,
  toast
});

const rootReducer = (state, action) => {
  if (action.type === UNAUTH_USER) {
    state.busRoutes = undefined;
    api.setAuthenticationHeader(null);
  }
  return appReducer(state, action);
};

export default rootReducer;
