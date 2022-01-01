import { ValidationError } from 'joi';

export class LocalesService {
  /**
   * @description convert joi error message to object
   */

  static mapJoiError(error: ValidationError) {
    const errorObj = {};
    for (const item of error.details) errorObj[item.context.key] = item.message;
    return errorObj;
  }
}
