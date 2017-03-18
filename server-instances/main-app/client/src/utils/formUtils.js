
export const createFormErrors = (err) => {
  const errors = {};
  const messages = err.response.data.error.details.messages; // ignore error handling for now
  Object.keys(messages).forEach((field) => {
    errors[field] = messages[field][0];
  });
  return errors;
};
