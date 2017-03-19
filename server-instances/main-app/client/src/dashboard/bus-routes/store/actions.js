import { routerActions } from 'react-router-redux';
import api from '../../../utils/api';
import { createFormErrors } from '../../../utils/formUtils';
import { showToast } from '../../../toast/store/actions';
import {
  SET_BUS_ROUTES, SET_BUS_ROUTE, UPDATE_BUS_ROUTE, REMOVE_BUS_ROUTE, SET_IS_FETCHING
} from './types';

// Sync Action Creators
export const setIsFetching = (isFetching) => {
  return { type: SET_IS_FETCHING, isFetching };
};

export const setRoute = (route) => {
  return { type: SET_BUS_ROUTE, route };
};

export const updateRoute = (routeId, newValues) => {
  return { type: UPDATE_BUS_ROUTE, routeId, newValues };
};

export const removeRoute = (routeId) => {
  return { type: REMOVE_BUS_ROUTE, routeId };
};

export const setRoutes = (routes) => {
  return { type: SET_BUS_ROUTES, routes };
};

// Async Action Creators
export const fetchOfficialRoutes = () => {
  return (dispatch, getState) => {
    // check if already fetching to avoid race conditions
    if (getState().busRoutes.isFetching) {
      return Promise.resolve();
    }

    const params = {
      filter: {
        where: {
          isOfficial: true
        }
      }
    };
    return api.get('/Routes', { params })
      .then((response) => {
        const routes = response.data;
        dispatch(setRoutes(routes));
        dispatch(setIsFetching(false));
      })
      .catch((err) => {
        console.error(err.message);
        dispatch(setIsFetching(false));
      });
  };
};

export const createOfficialRoute = (form) => {
  return (dispatch) => {
    // TODO maybe add fetching status or smth
    // also append isOfficial to form
    form.isOfficial = true;
    // add dummy source/destination for now // TODO add form functionality for source/destination
    form.source = {};
    form.destination = {};

    return api.post('/Routes', form)
      .then(response => {
        const route = response.data;
        dispatch(setRoute(route));
        dispatch(routerActions.push('/routes'));
        const message = 'Successful route creation.';
        dispatch(showToast({
          message,
          status: 'ok'
        }));
      })
      .catch((err) => {
        console.error(err.message);
        const message = 'Failed to create route.';
        dispatch(showToast({
          message,
          status: 'critical'
        }));
        return Promise.reject(createFormErrors(err));
      });
  };
};

export const updateOfficialRoute = (routeId, form) => {
  return (dispatch) => {
    // TODO maybe add fetching status or smth
    return api.patch(`/Routes/${routeId}`, form)
      .then(response => {
        const route = response.data;
        dispatch(updateRoute(routeId, route));
        dispatch(routerActions.push('/routes'));
        const message = 'Successful route update.';
        dispatch(showToast({
          message,
          status: 'ok'
        }));
      })
      .catch((err) => {
        console.error(err.message);
        const message = 'Failed to update route.';
        dispatch(showToast({
          message,
          status: 'critical'
        }));
        return Promise.reject(createFormErrors(err));
      });
  };
};

export const removeOfficialRoute = (routeId) => {
  return (dispatch) => {
    // TODO maybe add fetching status or smth
    return api.del(`/Routes/${routeId}`)
      .then(() => {
        dispatch(removeRoute(routeId));
        const message = 'Successful route removal.';
        dispatch(showToast({
          message,
          status: 'ok'
        }));
      })
      .catch((err) => {
        console.error(err.message);
        const message = 'Failed to remove route.';
        dispatch(showToast({
          message,
          status: 'critical'
        }));
      });
  };
};
