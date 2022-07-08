import { CustomRepository } from "src/db/TypeOrmExDecorator";
import { Repository } from "typeorm";
import { Book } from "./Book.entity";

@CustomRepository(Book)
export class BookRepository extends Repository<Book> {
  async findByIsbn(isbn: string): Promise<Book | undefined> {
    return this.findOneBy({ isbn });
  }
}