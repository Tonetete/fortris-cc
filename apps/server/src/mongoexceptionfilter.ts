import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
  } from '@nestjs/common';
  
  import * as MongooseError from 'mongoose/lib/error';
  
  @Catch(MongooseError)
  export class MongoExceptionFilter implements ExceptionFilter {
    catch(exception: MongooseError, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
  
      let error;
  
      switch (exception.name) {
        case 'Account ID Not Found': {
          error = {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Account ID Not Found',
          };
          break;
        }
        case 'ValidationError': {
          error = {
            statusCode: HttpStatus.BAD_REQUEST,
            message: exception.message,
          };
          break;
        }
        case 'DuplicateKeyError': {
          error = {
            statusCode: HttpStatus.BAD_REQUEST,
            message: exception.message,
          };
          break;
        }
        // case 'MongooseError': { break; } // general Mongoose error
        // case 'CastError': { break; }
        // case 'DisconnectedError': { break; }
        // case 'DivergentArrayError': { break; }
        // case 'MissingSchemaError': { break; }
        // case 'ValidatorError': { break; }
        // case 'ObjectExpectedError': { break; }
        // case 'ObjectParameterError': { break; }
        // case 'OverwriteModelError': { break; }
        // case 'ParallelSaveError': { break; }
        // case 'StrictModeError': { break; }
        // case 'VersionError': { break; }
        default: {
          error = {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal Error',
          };
          break;
        }
      }
  
      response.status(error.statusCode).json(error);
    }
  }
  
  @Catch(Error)
  export class ErrorExceptionFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
  
      let error;
  
      switch (exception.message) {
        case exception.message.match(/Account ID Not Found/)?.input: {
          error = {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Account ID Not Found',
          };
          break;
        }
        case exception.message.match(/E11000/)?.input: {
          error = {
            statusCode: HttpStatus.BAD_REQUEST,
            message: exception.message,
          };
          break;
        }
        default: {
          error = {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal Error',
          };
          break;
        }
      }
      response.status(error.statusCode).json(error);
    }
  }
  