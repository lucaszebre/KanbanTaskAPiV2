/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/boards.entity'
@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  async findOneBoardWithDetails(userId: string, boardId: string): Promise<Board | undefined> {
    // Use TypeORM query builder to fetch the board and its related columns, tasks, and subtasks
    const board = await this.boardRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.columns', 'columns')
      .leftJoinAndSelect('columns.tasks', 'tasks')
      .leftJoinAndSelect('tasks.subtasks', 'subtasks')
      .where('board.id = :boardId', { boardId })
      .andWhere('board.userId = :userId', { userId })
      .getOne();

    return board;
  }
  
  async create(Board: Partial<Board>): Promise<Board> {
    const newuser = this.boardRepository.create(Board);
    return this.boardRepository.save(newuser);
  }

  async findAll(): Promise<Board[]> {
    return this.boardRepository.find();
  }
  


  async findOne(id: string): Promise<Board> {
    return this.boardRepository.findOne({ where: { id } });
  }

  async update(id: string, Board: Partial<Board>): Promise<Board> {
    await this.boardRepository.update(id, Board);
    return this.boardRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.boardRepository.delete(id);
  }
}
