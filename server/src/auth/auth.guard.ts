import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request, Response } from "express";
import { monoLogger } from "mono-utils-core";
import { AuthService } from "./auth.service";

@Injectable()
export class UserGuard implements CanActivate {
        constructor(private readonly authService: AuthService) {}

        async canActivate(context: ExecutionContext) {
                const req: Request = context.switchToHttp().getRequest();
                const res: Response = context.switchToHttp().getResponse();

                console.log(req);
                const accessToken = req.cookies["access-token"] || "";
                if (accessToken) {
                        const user = await this.authService.getUserByAccessToken(accessToken);
                        if (!user) {
                                throw new UnauthorizedException("UnauthorizedException");
                        } else req.user = user;
                } else throw new UnauthorizedException("UnauthorizedException");
                return true;
        }
}
