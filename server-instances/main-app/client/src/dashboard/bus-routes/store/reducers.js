import {
  SET_BUS_ROUTES, SET_BUS_ROUTE, UPDATE_BUS_ROUTE, REMOVE_BUS_ROUTE, SET_IS_FETCHING
} from './types';

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
  let oldRoutes;
  let newRoute;
  let oldRouteIndex;
  switch(action.type) {
    case SET_BUS_ROUTES:
      newRoutes = action.routes;
      return { ...state,
        routes: newRoutes
      };
    case SET_BUS_ROUTE:
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
    case UPDATE_BUS_ROUTE:
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
    case REMOVE_BUS_ROUTE:
      routeId = action.routeId;
      oldRoutes = state.routes;
      oldRouteIndex = oldRoutes.findIndex(findRoute(routeId));
      if ( oldRouteIndex !== -1 ) {
        // already exists
        newRoutes = [
          ...oldRoutes.slice(0, oldRouteIndex),
          ...oldRoutes.slice(oldRouteIndex + 1)
        ]
      } else {
        newRoutes = [...oldRoutes]
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
