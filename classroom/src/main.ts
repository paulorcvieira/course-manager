import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'classroom',
        brokers: ['localhost:29092']
      }
    }
  });

  app.startAllMicroservices().then(() => {
    console.log('[Classroom] Microservice running!');
  });

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     transform: true
  //   })
  // );
  // app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalInterceptors(new ConflictInterceptor());
  // app.useGlobalInterceptors(new DatabaseInterceptor());
  // app.useGlobalInterceptors(new UnauthorizedInterceptor());
  // app.useGlobalInterceptors(new NotFoundInterceptor());
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  // app.useGlobalPipes(new ValidationPipe({ errorHttpStatusCode: 422 }));

  app.listen(process.env.SERVER_PORT || 3335).then(() => {
    console.log(
      `[Classroom] HTTP:${process.env.SERVER_PORT || 3335} server listening!`
    );
  });
}
bootstrap();
