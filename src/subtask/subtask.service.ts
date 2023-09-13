/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Subtask } from './entities/subtask.entity';

@Injectable()
export class SubtaskService {
  constructor(
    private subtaskRepository: Repository<Subtask>,
  ) {}

  async create(user: Partial<Subtask>): Promise<Subtask> {
    const newuser = this.subtaskRepository.create(user);
    return this.subtaskRepository.save(newuser);
  }



  async findOne(id: string): Promise<Subtask> {
    return this.subtaskRepository.findOne({ where: { id } });
  }

  async update(id: string, user: Partial<Subtask>): Promise<Subtask> {
    await this.subtaskRepository.update(id, user);
    return this.subtaskRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.subtaskRepository.delete(id);
  }
}