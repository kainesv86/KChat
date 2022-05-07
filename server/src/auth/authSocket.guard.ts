import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import * as Cookie from "cookie";
import { SocketExtend } from "socket.io";
import { AuthService } from "./auth.service";

@Injectable()
export class UserSocketGuard implements CanActivate {
        constructor(private readonly authService: AuthService) {}
        private async cookieParserSocket(context: ExecutionContext) {
                const client: SocketExtend = context.switchToWs().getClient();
                if (client.handshake.headers.cookie) client.cookies = Cookie.parse(client.handshake.headers.cookie);
                return client;
        }

        async canActivate(context: ExecutionContext) {
                const client: SocketExtend = await this.cookieParserSocket(context);
                if (!client.cookies) throw new UnauthorizedException("UnauthorizedException");

                const accessToken = client.cookies["access-token"] || "";
                if (accessToken) {
                        const user = await this.authService.getUserByAccessToken(accessToken);
                        if (!user) {
                                throw new UnauthorizedException("UnauthorizedException");
                        } else client.user = user;
                } else throw new UnauthorizedException("UnauthorizedException");
                return true;
        }
}
