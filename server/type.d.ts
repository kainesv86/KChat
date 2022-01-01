import { User as UserExtend } from './src/user/entities/user.entity';

declare global {
  namespace Express {
    interface User extends UserExtend {}
    export interface Request {
      user: User;
    }
  }
}
