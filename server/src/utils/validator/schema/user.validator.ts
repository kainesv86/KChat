import * as Joi from 'joi';
import { StringVnLang } from 'joi-vn-lang';
import { User } from '../../../user/entities/user.entity';

export function userJoiSchema(field: keyof User) {
  switch (field) {
    case 'username':
      return Joi.string()
        .min(5)
        .max(40)
        .trim()
        .lowercase()
        .required()
        .messages(StringVnLang);
    case 'password':
      return Joi.string()
        .min(5)
        .max(40)
        .trim()
        .alphanum()
        .required()
        .messages(StringVnLang);
    case 'email':
      return Joi.string().min(5).max(40).email().messages(StringVnLang);
    case 'avatarUrl':
      return Joi.string().trim().messages(StringVnLang);
    case 'description':
      return Joi.string().min(0).max(50).messages(StringVnLang);
  }
}
