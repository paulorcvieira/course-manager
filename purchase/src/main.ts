import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

import {
  ConflictInterceptor,
  DatabaseInterceptor,
  NotFoundInterceptor,
  UnauthorizedInterceptor
} from './common/errors/interceptors';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'purchases',
        brokers: ['localhost:29092']
      }
    }
  });

  app.startAllMicroservices().then(() => {
    console.log('[Purchase] Microservice running!');
  });

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     transform: true
  //   })
  // );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ConflictInterceptor());
  app.useGlobalInterceptors(new DatabaseInterceptor());
  app.useGlobalInterceptors(new UnauthorizedInterceptor());
  app.useGlobalInterceptors(new NotFoundInterceptor());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe({ errorHttpStatusCode: 422 }));

  app.listen(process.env.SERVER_PORT || 3334).then(() => {
    console.log(
      `[Purchase] HTTP:${process.env.SERVER_PORT || 3334} server listening!`
    );
  });
}
bootstrap();
