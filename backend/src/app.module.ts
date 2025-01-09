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
        // TypeOrmModule.forRootAsync({
        //     imports: [ConfigModule],
        //     useFactory: (configService: ConfigService) => ({
        //         type: 'mysql',
        //         host: configService.get<string>('MYSQL_HOST'),
        //         port: configService.get<number>('MYSQL_PORT'),
        //         username: configService.get<string>('MYSQL_USER'),
        //         password: configService.get<string>('MYSQL_PASSWORD'),
        //         database: configService.get<string>('MYSQL_DATABASE'),
        //         entities: [__dirname + "/**/*.entity{.ts,.js}"],
        //         synchronize: true
        //     }),
        //     inject: [ConfigService],
        // }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres', // Ändere den Datenbank-Typ
                host: configService.get<string>('POSTGRES_HOST'), // Neon Host
                port: configService.get<number>('POSTGRES_PORT') || 5432, // PostgreSQL-Port
                username: configService.get<string>('POSTGRES_USER'), // Benutzername
                password: configService.get<string>('POSTGRES_PASSWORD'), // Passwort
                database: configService.get<string>('POSTGRES_DATABASE'), // Datenbankname
                ssl: { rejectUnauthorized: false }, // Neon benötigt SSL
                entities: [__dirname + "/**/*.entity{.ts,.js}"],
                synchronize: true, // Setze auf `false` in Produktionsumgebungen
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
