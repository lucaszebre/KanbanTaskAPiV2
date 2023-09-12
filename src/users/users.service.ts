/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async findOneWithDetails(userId: string): Promise<User | undefined> {
    // Use TypeORM query builder to fetch a user along with their boards, columns, tasks, and subtasks
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.boards', 'boards')
      .leftJoinAndSelect('boards.columns', 'columns')
      .leftJoinAndSelect('columns.tasks', 'tasks')
      .leftJoinAndSelect('tasks.subtasks', 'subtasks')
      .where('user.userId = :userId', { userId })
      .getOne();

    return user;
  }


  async findOne(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }
  async findByID(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
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
