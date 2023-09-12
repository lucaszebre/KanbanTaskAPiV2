/* eslint-disable prettier/prettier */
import { Subtask } from 'src/subtask/entities/subtask.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ nullable: true })
    title: string;
  
    @Column({ default: '' })
    description: string;
  
    @Column({ default: 'Todo' })
    status: string;
  
    @OneToMany(() => Subtask, (subtask) => subtask)
    subtasks: Subtask[];
  
    @Column()
    columnId: string;
  
    @Column()
    boardId: string;
}