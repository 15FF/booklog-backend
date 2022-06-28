import { LocalDateTime } from '@js-joda/core';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { DateTimeUtil } from './util/DateTimeUtil';

export abstract class BaseTimeEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn({
		type: 'timestamp',
		nullable: false,
	})
	createdAt: Date;

	@UpdateDateColumn({
		type: 'timestamp',
		nullable: false,
	})
	updatedAt: Date;

	getCreatedAt(): LocalDateTime {
		return DateTimeUtil.toLocalDateTime(this.createdAt);
	}

	getUpdatedAtAt(): LocalDateTime {
		return DateTimeUtil.toLocalDateTime(this.updatedAt);
	}
}