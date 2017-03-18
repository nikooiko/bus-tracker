import { UPDATE_ROUTE, SET_ROUTE, SET_ROUTES, SET_IS_FETCHING } from './routesTypes';

const INITIAL_STATE = {
  routes: [],
  isFetching: false
};

const findRoute = (routeId) => {
  return (oldRoute) => {
    return oldRoute.id === routeId;
  }
};

export default (state = INITIAL_STATE, action) => {
  let routeId;
  let newRoutes;
  let newRoute;
  let oldRouteIndex;
  switch(action.type) {
    case SET_ROUTES:
      newRoutes = action.routes;
      return { ...state,
        routes: newRoutes
      };
    case SET_ROUTE:
      newRoute = action.route;
      newRoutes = [...state.routes];
      oldRouteIndex = newRoutes.findIndex(findRoute(newRoute.id));
      if ( oldRouteIndex !== -1 ) {
        // already exists
        newRoutes[oldRouteIndex] = newRoute;
      } else {
        newRoutes.push(newRoute);
      }
      return {
        ...state,
        routes: newRoutes
      };
    case UPDATE_ROUTE:
      routeId = action.routeId;
      newRoutes = [...state.routes];
      oldRouteIndex = newRoutes.findIndex(findRoute(routeId));
      if ( oldRouteIndex !== -1 ) {
        // already exists
        newRoute = {
          ...newRoutes[oldRouteIndex],
          ...action.newValues
        };
        newRoutes[oldRouteIndex] = newRoute;
      }
      return {
        ...state,
        routes: newRoutes
      };
    case SET_IS_FETCHING:
      return {...state, isFetching: action.isFetching };
    default:
      return state;
  }
}