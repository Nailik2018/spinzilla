import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {PlayerModule} from './models/player/player.module';
import {GenderModule} from './models/gender/gender.module';
import {AssociationModule} from './models/association/association.module';
import {ClubModule} from './models/club/club.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get<string>('POSTGRES_HOST'),
                port: 3306,
                username: configService.get<string>('POSTGRES_USER'),
                password: configService.get<string>('POSTGRES_PASSWORD'),
                database: configService.get<string>('POSTGRES_DATABASE'),
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
        ClubModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
