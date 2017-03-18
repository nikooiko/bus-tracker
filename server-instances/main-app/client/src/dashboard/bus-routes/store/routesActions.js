import { routerActions } from 'react-router-redux';
import api from '../../../utils/api';
import { SET_BUS_ROUTES, SET_BUS_ROUTE, UPDATE_BUS_ROUTE, SET_IS_FETCHING } from './routesTypes';
import { createFormErrors } from '../../../utils/formUtils';

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
      isOfficial: true
    };
    return api.get('/Routes', params)
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
        // dispatch(setRoute(route));
        dispatch(routerActions.push('/routes'));
      })
      .catch((err) => {
        console.error(err.message);
        return Promise.reject(createFormErrors(err));
      });
  };
};

export const updateOfficialRoute = (routeId, form) => {
  return (dispatch) => {
    // TODO maybe add fetching status or smth

    // todo maybe append isOfficial?

    return api.patch(`/Routes/${routeId}`, form)
      .then(response => {
        const route = response.data;
        dispatch(updateRoute(routeId, route));
        dispatch(routerActions.push('/routes'));
      })
      .catch((err) => {
        console.error(err.message);
        return Promise.reject(createFormErrors(err));
      });
  };
};
