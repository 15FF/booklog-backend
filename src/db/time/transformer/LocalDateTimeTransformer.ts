import { LocalDateTime } from "@js-joda/core";
import { ValueTransformer } from "typeorm";
import { DateTimeUtil } from "../util/DateTimeUtil";

export class LocalDateTimeTransformer implements ValueTransformer {
  // entity -> db
  to(entityValue: LocalDateTime): Date {
    return DateTimeUtil.toDate(entityValue);
  }

  // db -> entity
  from(databaseValue: Date): LocalDateTime {
    return DateTimeUtil.toLocalDateTime(databaseValue);
  }
}