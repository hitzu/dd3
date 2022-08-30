import bcrypt from 'bcryptjs';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';
import { Word } from './Words';
import { User } from './User';

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  wordId: number;

  @Column()
  opportunity: number;

  @Column({
    nullable: true
  })
  win: boolean;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(
    () => Word,
    word => word.reports
  )
  public word!: Word;

  @ManyToOne(
    () => User,
    user => user.reports
  )
  public user!: User;
}
