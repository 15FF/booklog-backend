import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/AuthModule';
import { BooksModule } from './book/BookModule';
import { typeORMConfig } from './config/TypeOrmConfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    BooksModule,
    AuthModule
  ],
})
export class AppModule {}
