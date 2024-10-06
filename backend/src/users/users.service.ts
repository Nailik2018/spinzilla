import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

class User {
    userId: number;
    username: string;
    password: string;
    roles: string[];
}

@Injectable()
export class UsersService {
    private users: User[];

    constructor(private configService: ConfigService) {
        this.users = [
            {
                userId: +this.configService.get<string>('USER_1_ID'),
                username: this.configService.get<string>('USER_1_USERNAME'),
                password: this.configService.get<string>('USER_1_PASSWORD'),
                roles: this.configService.get<string>('USER_1_ROLES').split(',')
            },
            {
                userId: +this.configService.get<string>('USER_2_ID'),
                username: this.configService.get<string>('USER_2_USERNAME'),
                password: this.configService.get<string>('USER_2_PASSWORD'),
                roles: this.configService.get<string>('USER_2_ROLES').split(',')
            },
        ];
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}
