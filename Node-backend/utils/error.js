export const createError = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.isAppError = true;
  return error;
};
