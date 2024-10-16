import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {VersioningType} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {AppCustomLogger} from './app.custom.logger';

async function bootstrap() {

    const logger = new AppCustomLogger('Main');
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    // @ToDo bleibt in der Entwicklungsphase (Frontend Entwicklung) drin Cors erlauben
    app.enableCors();
    // api url prefix
    app.setGlobalPrefix('api');
    // versioning
    app.enableVersioning({
        type: VersioningType.URI,
    });

    const config = new DocumentBuilder()
        .addBearerAuth()
        // .addBasicAuth({type: 'http', scheme: 'basic', description: 'Basic Auth', name: 'basic'})
        .setTitle('Spinzilla')
        .setDescription('Table Tennis Backend API System')
        .setVersion('1.0.0')
        .setContact('Contact', 'https://ttpoint.ch', 'info@ttpoint.ch')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(process.env.BACKEND_SWAGGER_PATH, app, document);
    const NODE_ENV = process.env.NODE_ENV || 'development';
    // const PORT: number = Number(process.env.BACKEND_PORT) || 8080;
    const PORT: number = Number(process.env.BACKEND_PORT) || 3000;
    await app.listen(PORT, () => {
        logger.log(`Running NestJS Backend API Mode: ${NODE_ENV} Port: ${PORT}`);
        console.log(`Running NestJS Backend API Mode: ${NODE_ENV} Port: ${PORT}`);
    });
}

bootstrap();
