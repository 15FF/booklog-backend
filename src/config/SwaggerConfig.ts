import { DocumentBuilder, OpenAPIObject } from "@nestjs/swagger";

export const swaggerConfig: Omit<OpenAPIObject, "paths"> = new DocumentBuilder()
  .setTitle('BookLog')
  .setDescription('BookLog API description')
  .setVersion('1.0.0')
  .addBearerAuth()
  .build();

