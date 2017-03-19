import api from '../../../utils/api';
import { showToast } from '../../../toast/store/actions';
import { SET_USERS, UPDATE_USER, REMOVE_USER, SET_IS_FETCHING } from './types';

// Sync Action Creators
export const setIsFetching = (isFetching) => {
  return { type: SET_IS_FETCHING, isFetching };
};

export const setUsers = (users) => {
  return { type: SET_USERS, users };
};

export const updateUser = (userId, newValues) => {
  return { type: UPDATE_USER, userId, newValues };
};

export const removeUser = (userId) => {
  return { type: REMOVE_USER, userId };
};

// Async Action Creators
export const fetchUsers = () => {
  return (dispatch, getState) => {
    // check if already fetching to avoid race conditions
    if (getState().users.isFetching) {
      return Promise.resolve();
    }

    const params = {
      filter: {
        include: {
          relation: 'roles',
          scope: {
            fields: ['name']
          }
        }
      }
    };

    return api.get('/AppUsers', { params })
      .then((response) => {
        const users = response.data;
        dispatch(setUsers(users));
        dispatch(setIsFetching(false));
      })
      .catch((err) => {
        console.error(err.message);
        dispatch(setIsFetching(false));
      });
  };
};

export const enableDriver = (userId) => {
  return (dispatch) => {
    // TODO maybe add fetching status or smth
    const data = {
      userId,
      roleName: 'driver'
    };
    return api.post('/AppUsers/setRole', data)
      .then((response) => {
        const roles = response.data;
        dispatch(updateUser(userId, { roles }));
        const message = 'Added driver privileges successfully.';
        dispatch(showToast({
          message,
          status: 'ok'
        }));
      })
      .catch((err) => {
        console.error(err.message);
        const message = 'Failed to add driver privileges.';
        dispatch(showToast({
          message,
          status: 'critical'
        }));
      });
  };
};

export const disableDriver = (userId) => {
  return (dispatch) => {
    // TODO maybe add fetching status or smth
    const data = {
      userId,
      roleName: 'driver',
      shouldRemove: true
    };
    return api.post('/AppUsers/setRole', data)
      .then((response) => {
        const roles = response.data;
        dispatch(updateUser(userId, { roles }));
        const message = 'Removed driver privileges successfully.';
        dispatch(showToast({
          message,
          status: 'ok'
        }));
      })
      .catch((err) => {
        console.error(err.message);
        const message = 'Failed to remove driver privileges.';
        dispatch(showToast({
          message,
          status: 'critical'
        }));
      });
  };
};
