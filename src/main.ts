// Core
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// App
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const configService = app.get(ConfigService);
    const port = configService.get('PORT') ?? 4000;

    app.set('trust proxy', 1);
    app.use(rateLimit({
        windowMs: 60 * 1000, // 1 minutes
        max:      120, // limit each IP to 100 requests per windowMs
    }));
    app.use(helmet());
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'http://localhost:80',
            'http://localhost:5000',
            'http://46.101.215.145',
        ],
        credentials: true,
    });

    await app.listen(port);

    Logger.log(`🚀 Server running on http://localhost:${port}`, 'NestApplication');
    Logger.log(`🚀 Graphql playground running on http://localhost:${port}/graphql`, 'ApolloServer');
}

bootstrap();
