import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './AppModule';
import { swaggerConfig } from './config/SwaggerConfig';
import { winstonLoggerConfig } from './config/WinstonLoggerConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(
      winstonLoggerConfig
    )
  });
  
  // Swagger 설정
  if (process.env.NODE_ENV !== 'production') {
    const document: OpenAPIObject = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);
  }

  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
