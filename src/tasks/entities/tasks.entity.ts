/* eslint-disable prettier/prettier */
import { Columns } from 'src/column/entities/column.entity';
import { Subtask } from 'src/subtask/entities/subtask.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: 'Todo' })
  status: string;

  @ManyToOne(() => Columns, (column) => column.tasks)

  @JoinColumn({ name: 'columnId' })
  column: Columns;

  @OneToMany(() => Subtask, (subtask) => subtask)
  subtasks: Subtask[];
}