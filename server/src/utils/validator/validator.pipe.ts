import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ObjectSchema } from 'joi';
import { LocalesService } from '../locales/locales.service';

import { apiResponse } from '../../app/interface/apiResponse';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(input: any) {
    const { error, value } = this.schema.validate(input, { abortEarly: false });

    if (error) {
      throw apiResponse.sendError(
        { details: LocalesService.mapJoiError(error) },
        'BadRequestException',
      );
      // throw new BadRequestException(LocalesService.mapJoiError(error));
    }

    return value;
  }
}
