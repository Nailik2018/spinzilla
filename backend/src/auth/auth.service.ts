import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {

    usersService: UsersService;
    jwtService: JwtService;

    constructor(
        usersService: UsersService,
        jwtService: JwtService,
    ) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }

    async signIn(username: string, pass: string) {
        const user = await this.usersService.findOne(username);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const payload = {username: user.username, sub: user.userId, roles: user.roles};
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}