/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/tasks.entity';
import { Columns } from 'src/column/entities/column.entity';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
     @InjectRepository(Columns)
    private columnRepository: Repository<Columns>  ) {}


  

  

 
  async findOne(id: string): Promise<Task> {
    return this.taskRepository.findOne({ where: { id } });
  }

  async update(id:string, user: Partial<Task>): Promise<Task> {
    await this.taskRepository.update(id, user);
    return this.taskRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
