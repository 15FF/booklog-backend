import { Module } from '@nestjs/common';
import { BookRepository } from 'src/book/BookRepository';
import { TypeOrmExModule } from 'src/db/TypeOrmExModule';
import { ReviewController } from './ReviewController';
import { ReviewRepository } from './ReviewRepository';
import { ReviewService } from './ReviewService';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([ReviewRepository, BookRepository]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService]
})
export class ReviewModule {}
