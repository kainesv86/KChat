import {
  BadGatewayException,
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LocalesService } from 'src/utils/locales/locales.service';
import { ErrorType, ResponseBody } from './api.interface';

class ApiResponse {
  constructor(private readonly localeService: LocalesService) {}

  /**
   *
   * @description allow translate message before send back to client
   */
  public sendError<T>(body: ResponseBody<T>, type: ErrorType) {
    const res = body;

    switch (type) {
      case 'BadGatewayException':
        return new BadGatewayException(res);
      case 'BadRequestException':
        return new BadRequestException(res);
      case 'InternalServerErrorException':
        return new InternalServerErrorException(res);
      case 'UnauthorizedException':
        return new UnauthorizedException(res);
      case 'NotFoundException':
        return new NotFoundException(res);
      case 'ForbiddenException':
        return new ForbiddenException(res);
    }
  }
}

export const apiResponse = new ApiResponse(new LocalesService());
