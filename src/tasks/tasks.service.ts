/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/tasks.entity';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private productRepository: Repository<Task>  ) {}
  async create(user: Partial<Task>): Promise<Task> {
    const newuser = this.productRepository.create(user);
    return this.productRepository.save(newuser);
  }

  async findAll(): Promise<Task[]> {
    return this.productRepository.find();
  }

 
  async findOne(id: string): Promise<Task> {
    return this.productRepository.findOne({ where: { id } });
  }

  async update(id:string, user: Partial<Task>): Promise<Task> {
    await this.productRepository.update(id, user);
    return this.productRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}
