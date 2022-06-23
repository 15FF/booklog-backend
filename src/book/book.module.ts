import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/db/typeorm-ex.module';
import { BookSearchService } from './book-search.service';
import { BookController } from './book.controller';
import { BookRepository } from './book.repository';
import { BookService } from './book.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([BookRepository]),
    HttpModule
  ],
  controllers: [BookController],
  providers: [BookService, BookSearchService]
})
export class BooksModule {}
