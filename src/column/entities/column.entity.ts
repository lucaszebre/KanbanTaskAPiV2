/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Board } from 'src/boards/entities/boards.entity';
import { Task } from 'src/tasks/entities/tasks.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
@Entity()
export class Columns {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column()
    name: string;
  

    @ManyToOne(() => Board, (board) => board.columns)
    @JoinColumn({ name: 'boardId' })
    board: Board;

  @OneToMany(() => Task, (task) => task.column)
  tasks: Task[];
  }