import {
  SET_USERS, SET_IS_FETCHING, UPDATE_USER, REMOVE_USER
} from './types';

const INITIAL_STATE = {
  users: [],
  isFetching: false
};

const findUser = (userId) => {
  return (oldUser) => {
    return oldUser.id === userId;
  }
};

export default (state = INITIAL_STATE, action) => {
  let userId;
  let newUsers;
  let oldUsers;
  let newUser;
  let oldUserIndex;
  switch(action.type) {
    case SET_USERS:
      newUsers = action.users;
      return { ...state,
        users: newUsers
      };
    case UPDATE_USER:
      userId = action.userId;
      newUsers = [...state.users];
      oldUserIndex = newUsers.findIndex(findUser(userId));
      if ( oldUserIndex !== -1 ) {
        // already exists
        newUser = {
          ...newUsers[oldUserIndex],
          ...action.newValues
        };
        newUsers[oldUserIndex] = newUser;
      }
      return {
        ...state,
        users: newUsers
      };
    case REMOVE_USER:
      userId = action.userId;
      oldUsers = state.users;
      oldUserIndex = oldUsers.findIndex(findUser(userId));
      if ( oldUserIndex !== -1 ) {
        // already exists
        newUsers = [
          ...oldUsers.slice(0, oldUserIndex),
          ...oldUsers.slice(oldUserIndex + 1)
        ]
      } else {
        newUsers = [...oldUsers]
      }
      return {
        ...state,
        users: newUsers
      };
    case SET_IS_FETCHING:
      return {...state, isFetching: action.isFetching };
    default:
      return state;
  }
}
