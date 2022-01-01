import * as Joi from 'joi';
import { User } from 'src/user/entities/user.entity';
import { userJoiSchema } from 'src/utils/validator/schema/user.validator';
import { ValidatorService } from 'src/utils/validator/validator.service';

const { getJoiSchemas } =
  ValidatorService.joiSChemaGenerator<User>(userJoiSchema);

export class LoginAuthDto {
  username: string;
  password: string;
}

export const vLoginAuthDto = Joi.object({
  ...getJoiSchemas(['username', 'password']),
});
