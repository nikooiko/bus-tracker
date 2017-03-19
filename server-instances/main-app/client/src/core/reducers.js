import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux'
import { createResponsiveStateReducer } from 'redux-responsive';
import sidebar from '../dashboard/navigation/sidebar/store/reducers';
import auth from '../auth/store/reducers';
import { UNAUTH_USER } from '../auth/store/types';
import busRoutes from '../dashboard/bus-routes/store/reducers';
import users from '../dashboard/users/store/reducers';
import toast from '../toast/store/reducers';
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
  users,
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
