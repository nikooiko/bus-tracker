import api from '../../../utils/api';
import { SET_ROUTES, SET_ROUTE, UPDATE_ROUTE, SET_IS_FETCHING } from './routesTypes';

// Sync Action Creators
export const setIsFetching = (isFetching) => {
  return { type: SET_IS_FETCHING, isFetching };
};

export const setRoute = (route) => {
  return { type: SET_ROUTE, route };
};

export const updateRoute = (routeId, newValues) => {
  return { type: UPDATE_ROUTE, routeId, newValues };
};

export const setRoutes = (routes) => {
  return { type: SET_ROUTES, routes };
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
