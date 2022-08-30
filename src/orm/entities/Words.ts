import bcrypt from 'bcryptjs';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { Report } from './Report';
@Entity('words')
export class Word {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  description: string;

  @Column('timestamp without time zone', { nullable: true })
  selected_at: Date | null;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => Report,
    report => report.word
  )
  reports: Report[];
}
