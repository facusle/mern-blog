// create function for config error with Error() constructor
export const errorHandler = (statusCode, message) => {
     const error = new Error();
     error.statusCode = statusCode;
     error.message = message;
     return error;
};
