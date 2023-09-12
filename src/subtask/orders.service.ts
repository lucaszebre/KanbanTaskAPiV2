/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subtask } from './entities/subtask.entity';

@Injectable()
export class SubtaskService {
  constructor(
    @InjectRepository(Subtask)
    private orderRepository: Repository<Subtask>,
  ) {}
  async create(user: Partial<Subtask>): Promise<Subtask> {
    const newuser = this.orderRepository.create(user);
    return this.orderRepository.save(newuser);
  }

  async findAll(): Promise<Subtask[]> {
    return this.orderRepository.find();
  }

  async findSubtaskUsers(user_id:number): Promise<Subtask[]> {
    return this.orderRepository.find({where:{user_id}})
  }
  async findOne(id: number): Promise<Subtask> {
    return this.orderRepository.findOne({ where: { id } });
  }

  async update(id: number, user: Partial<Subtask>): Promise<Subtask> {
    await this.orderRepository.update(id, user);
    return this.orderRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }
}