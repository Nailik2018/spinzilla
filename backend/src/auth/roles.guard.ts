import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {JwtService} from '@nestjs/jwt';
import {Request} from 'express';
import {ROLES_KEY} from './decorators/roles.decotrator';
import {jwtConstants} from './constants';

@Injectable()
export class RolesGuard implements CanActivate {

    reflector: Reflector;
    jwtService: JwtService;

    constructor(
        reflector: Reflector,
        jwtService: JwtService,
    ) {
        this.reflector = reflector;
        this.jwtService = jwtService;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles || requiredRoles.length === 0) {
            return true; // Wenn keine Rollen erforderlich sind, gewähre Zugriff
        }

        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: jwtConstants.secret,
            });
            request['user'] = payload;

            // Prüfe, ob der Benutzer eine der erforderlichen Rollen hat
            return requiredRoles.some(role => payload.roles?.includes(role));
        } catch {
            throw new UnauthorizedException();
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
