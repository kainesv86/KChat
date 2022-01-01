import * as Joi from 'joi';
import { User } from 'src/user/entities/user.entity';
import { userJoiSchema } from 'src/utils/validator/schema/user.validator';
import { ValidatorService } from 'src/utils/validator/validator.service';

const { getJoiSchema, getJoiSchemas } =
  ValidatorService.joiSChemaGenerator<User>(userJoiSchema);

export class RegisterAuthDto {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export const vRegisterAuthDto = Joi.object({
  ...getJoiSchemas(['username', 'password', 'email']),
  confirmPassword: getJoiSchema('password').valid(Joi.ref('password')),
});
