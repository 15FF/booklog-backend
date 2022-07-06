import { DocumentBuilder, OpenAPIObject } from "@nestjs/swagger";

export const swaggerConfig: Omit<OpenAPIObject, "paths"> = new DocumentBuilder()
  .setTitle('Goose Swagger Example')
  .setDescription('The Goose API description')
  .setVersion('1.0.0')
  .addTag('Goose')
  .addBearerAuth(
    { type: 'http', scheme: 'bearer', bearerFormat: 'Token' }, 
    'access-token'
  )
  .build();

