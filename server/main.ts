import { Server } from 'http';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { isProd } from '@constants/shared';

//module
import { AppModule } from './app.module';

//type
import { INestApplication } from '@nestjs/common';
import { NextApiHandler } from 'next';

export module Backend {
  let app: INestApplication;

  export async function getApp() {
    if (!app) {
      app = await checkEnv();
      app.setGlobalPrefix('api');
      app.useGlobalPipes(
        new ValidationPipe({
          whitelist: true,
          transform: true,
        })
      );
      await app.init();
    }

    return app;
  }

  export async function getListener() {
    const app = await getApp();
    const server: Server = app.getHttpServer();
    const [listener] = server.listeners('request') as NextApiHandler[];
    return listener;
  }

  async function checkEnv(): Promise<INestApplication> {
    return await NestFactory.create(AppModule, {
      bodyParser: false,
      logger: isProd ? ['log', 'error', 'warn', 'verbose', 'debug'] : ['error', 'warn', 'verbose', 'debug'],
    });
  }
}
