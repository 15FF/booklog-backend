import { LocalDate } from '@js-joda/core';
import { ValueTransformer } from 'typeorm';
import { DateTimeUtil } from '../util/DateTimeUtil';

export class LocalDateTransformer implements ValueTransformer {
  // entity -> db
  to(entityValue: LocalDate): Date {
    return DateTimeUtil.toDate(entityValue);
  }

  // db -> entity
  from(databaseValue: Date): LocalDate {
    return DateTimeUtil.toLocalDate(databaseValue);
  }
}