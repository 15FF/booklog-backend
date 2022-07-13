import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/AuthModule';
import { BookModule } from './book/BookModule';
import { typeORMConfig } from './config/TypeOrmConfig';
import { ReviewModule } from './review/ReviewModule';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    BookModule,
    ReviewModule,
    AuthModule
  ],
})
export class AppModule {}
