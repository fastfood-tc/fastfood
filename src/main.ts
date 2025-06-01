import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConsoleLogger, VersioningType } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
    logger: new ConsoleLogger({ prefix: 'FastFood' }),
  });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.enableShutdownHooks();
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('api/v1');
  const options = new DocumentBuilder()
    .setTitle('API FastFood')
    .setDescription('API FastFood docs')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`/docs`, app, document);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
