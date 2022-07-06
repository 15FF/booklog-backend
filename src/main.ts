import { NestFactory } from '@nestjs/core';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { AppModule } from './AppModule';
import { swaggerConfig } from './config/SwaggerConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger 설정
  let document: OpenAPIObject;
  if (process.env.NODE_ENV !== 'production') {
    document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(3000);
}
bootstrap();
