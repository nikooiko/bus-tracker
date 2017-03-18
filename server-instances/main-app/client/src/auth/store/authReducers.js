import { AUTH_USER, UNAUTH_USER } from './authTypes';

const INITIAL_STATE = {
  authenticated: false,
  rememberMe: false,
  user: null,
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case AUTH_USER:
      return { ...state,
        authenticated: true,
        rememberMe: action.rememberMe,
        user: action.user
      };
    case UNAUTH_USER:
      return { ...state, authenticated: false, user: null, rememberMe: false };
    default:
      return state;
  }
}
