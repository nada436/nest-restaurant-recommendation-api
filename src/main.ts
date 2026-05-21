import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global error shape
  app.useGlobalFilters(new HttpExceptionFilter())
  // Global validation — strips unknown fields, transforms types
  app.useGlobalPipes(new ValidationPipe({
    whitelist:              true,   // strip properties not in DTO
    forbidNonWhitelisted:   true,   // throw if unknown property arrives
    transform:              true,   // auto-convert to TS types (@Type decorators)
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));
   //swagger config
  const config = new DocumentBuilder()
  .setTitle('Restaurant Management API')
  .setDescription('API for restaurant management system')
  .setVersion('1.0')
  .build();
   const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
