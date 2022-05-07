import UserExtend from "./src/user/entities/user.entity";
import { Socket } from "socket.io";

declare global {
        namespace Express {
                interface User extends UserExtend {}
                export interface Request {
                        user: UserExtend;
                }
        }
}
declare module "socket.io" {
        export class SocketExtend extends Socket {
                user?: User;
                cookies: Record<string, string>;
        }
}
