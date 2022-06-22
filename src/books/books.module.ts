import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/db/typeorm-ex.module';
import { BookRepository } from './book.repository';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([BookRepository]),
  ],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
