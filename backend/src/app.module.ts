import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {PlayerModule} from './models/player/player.module';
import { GenderModule } from './models/gender/gender.module';
import { AssociationModule } from './models/association/association.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get<string>('MYSQL_HOST'),
                port: configService.get<number>('MYSQL_PORT'),
                username: configService.get<string>('MYSQL_USER'),
                password: configService.get<string>('MYSQL_PASSWORD'),
                database: configService.get<string>('MYSQL_DATABASE'),
                entities: [__dirname + "/**/*.entity{.ts,.js}"],
                synchronize: true
            }),
            inject: [ConfigService],
        }),
        AuthModule,
        UsersModule,
        PlayerModule,
        GenderModule,
        AssociationModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
