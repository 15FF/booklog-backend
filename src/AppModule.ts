import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './book/BookModule';
import { typeORMConfig } from './config/TypeOrmConfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    BooksModule
  ],
})
export class AppModule {}
