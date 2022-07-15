import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/AuthModule';
import { BookRepository } from 'src/book/BookRepository';
import { TypeOrmExModule } from 'src/db/TypeOrmExModule';
import { ReviewController } from './ReviewController';
import { ReviewRepository } from './ReviewRepository';
import { ReviewService } from './ReviewService';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([ReviewRepository, BookRepository]), 
    AuthModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService]
})
export class ReviewModule {}
