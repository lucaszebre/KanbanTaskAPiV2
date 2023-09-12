/* eslint-disable prettier/prettier */
import { Task } from 'src/tasks/entities/tasks.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Board {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    name: string;
  
    @OneToMany(() => Task, (task) => task)
    columns: Task[];
    
}