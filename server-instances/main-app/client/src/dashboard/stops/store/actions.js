import { routerActions } from 'react-router-redux';
import api from '../../../utils/api';
import { createFormErrors } from '../../../utils/formUtils';
import { showToast } from '../../../toast/store/actions';
import {
  SET_STOPS, SET_STOP, UPDATE_STOP, REMOVE_STOP, SET_IS_FETCHING
} from './types';

// Sync Action Creators
export const setIsFetching = (isFetching) => {
  return { type: SET_IS_FETCHING, isFetching };
};

export const setStop = (stop) => {
  return { type: SET_STOP, stop };
};

export const updateStopSync = (stopId, newValues) => {
  return { type: UPDATE_STOP, stopId, newValues };
};

export const removeStopSync = (stopId) => {
  return { type: REMOVE_STOP, stopId };
};

export const setStops = (stops) => {
  return { type: SET_STOPS, stops };
};

// Async Action Creators
export const fetchStops = () => {
  return (dispatch, getState) => {
    // check if already fetching to avoid race conditions
    if (getState().stops.isFetching) {
      return Promise.resolve();
    }
    const params = {};
    return api.get('/Stops', { params })
      .then((response) => {
        const stops = response.data;
        dispatch(setStops(stops));
        dispatch(setIsFetching(false));
      })
      .catch((err) => {
        console.error(err.message);
        dispatch(setIsFetching(false));
      });
  };
};

export const createStop = (form) => {
  return (dispatch) => {
    // TODO maybe add fetching status or smth

    return api.post('/Stops', form)
      .then(response => {
        const stop = response.data;
        dispatch(setStop(stop));
        dispatch(routerActions.push('/stops'));
        const message = 'Successful stop creation.';
        dispatch(showToast({
          message,
          status: 'ok'
        }));
      })
      .catch((err) => {
        console.error(err.message);
        const message = 'Failed to create stop.';
        dispatch(showToast({
          message,
          status: 'critical'
        }));
        return Promise.reject(createFormErrors(err));
      });
  };
};

export const updateStop = (stopId, form) => {
  return (dispatch) => {
    // TODO maybe add fetching status or smth
    return api.patch(`/Stops/${stopId}`, form)
      .then(response => {
        const stop = response.data;
        dispatch(updateStopSync(stopId, stop));
        dispatch(routerActions.push('/stops'));
        const message = 'Successful stop update.';
        dispatch(showToast({
          message,
          status: 'ok'
        }));
      })
      .catch((err) => {
        console.error(err.message);
        const message = 'Failed to update stop.';
        dispatch(showToast({
          message,
          status: 'critical'
        }));
        return Promise.reject(createFormErrors(err));
      });
  };
};

export const removeStop = (stopId) => {
  return (dispatch) => {
    // TODO maybe add fetching status or smth
    return api.del(`/Stops/${stopId}`)
      .then(() => {
        dispatch(removeStopSync(stopId));
        const message = 'Successful stop removal.';
        dispatch(showToast({
          message,
          status: 'ok'
        }));
      })
      .catch((err) => {
        console.error(err.message);
        const message = 'Failed to remove stop.';
        dispatch(showToast({
          message,
          status: 'critical'
        }));
      });
  };
};
