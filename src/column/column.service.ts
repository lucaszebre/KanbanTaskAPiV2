/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Columns } from './entities/column.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from 'src/tasks/entities/tasks.entity';

@Injectable()
export class ColumnService {
  columnsRepository: any;
  constructor(
    @InjectRepository(Columns)
    private readonly columnRepository: Repository<Columns>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}
  async create(Columns: Partial<Columns>): Promise<Columns> {
    const newuser = this.columnsRepository.create(Columns);
    return this.columnsRepository.save(newuser);
  }








  async createTaskInColumn(id: string, newTasks: Task[]): Promise<void[]> {
    // Find the column
    const column = await this.columnRepository.findOne({ where: { id } });
    if (!column) {
      throw new NotFoundException('Column not found');
    }
  
    // Set the column reference for each new task and save them
    const savedTasks = await Promise.all(
      newTasks.map(async (newTask) => {
        newTask.column = column;
        await this.taskRepository.save(newTask);
      })
    );
  
    return savedTasks;
  }

 

  async findOne(id: string): Promise<Columns> {
    return this.columnsRepository.findOne(id, { relations: ['tasks', 'tasks.subtasks'] });
  }

  async update(id: string, Board: Partial<Columns>): Promise<Columns> {
    await this.columnsRepository.update(id, Board);
    return this.columnsRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.columnsRepository.delete(id);
  }
}
