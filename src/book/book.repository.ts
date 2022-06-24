import { CustomRepository } from "src/db/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { Book } from "./book.entity";
import { CreateBookDto } from "./dto/create-book.dto";

@CustomRepository(Book)
export class BookRepository extends Repository<Book> {

  async createBook(createBookDto: CreateBookDto) {
    return await this.save(createBookDto.toEntity());
  }
}