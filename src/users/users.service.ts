/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: Repository<User>,
  ) {}
  async findOneWithDetails(userId: string): Promise<User | undefined> {
    // Use TypeORM query builder to fetch a user along with their boards, columns, tasks, and subtasks
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['boards', 'boards.columns', 'boards.columns.tasks', 'boards.columns.tasks.subtasks'],
    });
  
    return user;
  }


  async findOne(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email }, relations:{boards:true} });
  }
  async findByID(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id }, relations:{boards:true} });
  }

  async create(user: Partial<User>): Promise<User> {
    const newuser = this.userRepository.create(user);
    return this.userRepository.save(newuser);
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<User[]> {
    await this.userRepository.delete(id);
    return this.userRepository.find();
  }
}
