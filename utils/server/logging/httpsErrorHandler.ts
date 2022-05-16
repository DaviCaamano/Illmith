import { LogHandler } from '@interface/server/logging';
import { HttpException, HttpStatus } from '@nestjs/common';
import { isProd } from '@constants/shared';
import { ErrorResponse } from '@error';

export type ErrorHandler = {
  (arg1: string | ErrorObj | number): never;
  (arg1: string | ErrorObj, arg2: number): never;
  (arg1: string, arg2: ErrorObj): never;
  (arg1: string, arg2: ErrorObj, arg3: number): never;
};

type ErrorObj = Record<any, any>;
/**
 * Initialize a shortcut function to report HTTP Errors and log them
 * Args must always be in the following order, but A, B and C can be omitted (at least A or B is required)
 * A) Message String describing the error.
 * B) Error class or JSON, this Error Class or JSON will be omitted from the response
 *        (see errorResponseHandler for more info)
 * C) Status Code number
 */
export const httpErrorHandler = (errorLogger: LogHandler) => {
  function report(arg1: string | ErrorObj | number): never;
  function report(arg1: string | ErrorObj, arg2: number): never;
  function report(arg1: string, arg2: ErrorObj): never;
  function report(arg1: string, arg2: ErrorObj, arg3: number): never;
  function report(arg1: number | string | ErrorObj, arg2?: number | ErrorObj, arg3?: number): never {
    let errorClass: ErrorResponse;
    let errorLog: ErrorResponse;

    if (typeof arg1 === 'number') {
      errorClass = {
        message: 'Internal Server Error',
        statusCode: arg1,
      };
      errorLog = { ...errorClass };
    } else {
      let statusCode =
        typeof arg3 === 'number' ? arg3 : typeof arg2 === 'number' ? arg2 : HttpStatus.INTERNAL_SERVER_ERROR;

      if (typeof arg1 === 'string') {
        errorClass = {
          message: arg1,
          statusCode,
        };
        errorLog = { ...errorClass };
        if (typeof arg2 === 'object') {
          if (!isProd) {
            errorClass.error = arg2;
          }
          if (arg2.message) {
            if (!isProd) {
              errorClass.message += ' | ' + arg2.message;
            }
            errorLog.message += ' | ' + arg2.message;
          }
          errorLog.error = arg2;
        }
        //arg1 is an error class
      } else {
        errorClass = {
          message: 'Internal Server Error',
          statusCode,
        };
        errorLog = { ...errorClass };
        if (!isProd) {
          errorClass.error = arg1;
        }
        errorLog.error = arg1;
      }
    }

    errorLogger(JSON.stringify(errorLog, null, '\t'));
    throw new HttpException(errorClass, errorClass.statusCode);
  }
  return report;
};

/**
 * works similar to httpErrorHandler but always includes the object supplied in the arguments.
 * httpErrorHandler only includes the error class or supplied JSON for non-production enviroments so users are not
 * exposed to the error class itself.
 * errorResponseHandler however should be used when you want to show the user the error class or a JSON in the
 * error response.
 * @param errorLogger
 */
export const errorResponseHandler = (errorLogger: LogHandler) => {
  function report(arg1: string | ErrorObj | number): never;
  function report(arg1: string | ErrorObj, arg2: number): never;
  function report(arg1: string, arg2: ErrorObj): never;
  function report(arg1: string, arg2: ErrorObj, arg3: number): never;
  function report(arg1: number | string | ErrorObj, arg2?: number | ErrorObj, arg3?: number): never {
    let errorClass: ErrorResponse;
    let errorLog: ErrorResponse;

    if (typeof arg1 === 'number') {
      errorClass = {
        message: 'Internal Server Error',
        statusCode: arg1,
      };
      errorLog = { ...errorClass };
    } else {
      let statusCode =
        typeof arg3 === 'number' ? arg3 : typeof arg2 === 'number' ? arg2 : HttpStatus.INTERNAL_SERVER_ERROR;

      if (typeof arg1 === 'string') {
        errorClass = {
          message: arg1,
          statusCode,
        };
        errorLog = { ...errorClass };
        if (typeof arg2 === 'object') {
          errorClass.error = arg2;
          errorLog.error = arg2;
        }
      } else {
        errorClass = {
          message: 'Internal Server Error',
          statusCode,
          error: arg1,
        };
        errorLog = { ...errorClass };
      }
    }

    errorLogger(JSON.stringify(errorLog, null, '\t'));
    throw new HttpException(errorClass, errorClass.statusCode);
  }
  return report;
};
