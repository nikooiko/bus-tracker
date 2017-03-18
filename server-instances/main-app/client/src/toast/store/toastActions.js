import { SHOW_TOAST, HIDE_TOAST } from './toastTypes';

const TOAST_LIFETIME = 5000; // 5sec

export const showToast = (opts) => {
  return (dispatch, getState) => {
    const toast = getState().toast;
    if (toast.timer) clearTimeout(toast.timer);
    const timer = setTimeout(() => {
      dispatch({ type: HIDE_TOAST });
    }, TOAST_LIFETIME);

    dispatch({ type: SHOW_TOAST, opts, timer });
    return Promise.resolve();
  }
};
