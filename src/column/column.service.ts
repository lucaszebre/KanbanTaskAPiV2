/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Columns } from './entities/column.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from 'src/tasks/entities/tasks.entity';
import { Subtask } from 'src/subtask/entities/subtask.entity';

@Injectable()
export class ColumnService {
  columnsRepository: any;
  constructor(
    @InjectRepository(Columns)
    private readonly columnRepository: Repository<Columns>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task> , 
    @InjectRepository(Subtask)
    private readonly subtaskRepository: Repository<Subtask>
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
  
    // Create and associate tasks with subtasks
    const savedTasks = await Promise.all(
      newTasks.map(async (newTask) => {
        // Set the column reference for the new task
        newTask.column = column;
  
        // If newTask has subtasks, create and associate them
        if (newTask.subtasks) {
          newTask.subtasks = await Promise.all(
            newTask.subtasks.map(async (subtask) => {
              subtask.task = newTask; // Set the task reference for the subtask
              return await this.subtaskRepository.save(subtask);
            })
          );
        }
  
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
