import { BaseTimeEntity } from "src/db/time/BaseTimeEntity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique(['username'])
export class User extends BaseTimeEntity {
  @Column()
  username: string;

  @Column()
  password: string;
}