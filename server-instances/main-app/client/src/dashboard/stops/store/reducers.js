import {
  SET_STOPS, SET_STOP, UPDATE_STOP, REMOVE_STOP, SET_IS_FETCHING
} from './types';

const INITIAL_STATE = {
  stops: [],
  isFetching: false
};

const findStop = (stopId) => {
  return (oldStop) => {
    return oldStop.id === stopId;
  }
};

export default (state = INITIAL_STATE, action) => {
  let stopId;
  let newStops;
  let oldStops;
  let newStop;
  let oldStopIndex;
  switch(action.type) {
    case SET_STOPS:
      newStops = action.stops;
      return { ...state,
        stops: newStops
      };
    case SET_STOP:
      newStop = action.stop;
      newStops = [...state.stops];
      oldStopIndex = newStops.findIndex(findStop(newStop.id));
      if ( oldStopIndex !== -1 ) {
        // already exists
        newStops[oldStopIndex] = newStop;
      } else {
        newStops.push(newStop);
      }
      return {
        ...state,
        stops: newStops
      };
    case UPDATE_STOP:
      stopId = action.stopId;
      newStops = [...state.stops];
      oldStopIndex = newStops.findIndex(findStop(stopId));
      if ( oldStopIndex !== -1 ) {
        // already exists
        newStop = {
          ...newStops[oldStopIndex],
          ...action.newValues
        };
        newStops[oldStopIndex] = newStop;
      }
      return {
        ...state,
        stops: newStops
      };
    case REMOVE_STOP:
      stopId = action.stopId;
      oldStops = state.stops;
      oldStopIndex = oldStops.findIndex(findStop(stopId));
      if ( oldStopIndex !== -1 ) {
        // already exists
        newStops = [
          ...oldStops.slice(0, oldStopIndex),
          ...oldStops.slice(oldStopIndex + 1)
        ]
      } else {
        newStops = [...oldStops]
      }
      return {
        ...state,
        stops: newStops
      };
    case SET_IS_FETCHING:
      return {...state, isFetching: action.isFetching };
    default:
      return state;
  }
}
