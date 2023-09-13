/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/boards.entity'
import { User } from 'src/users/user.entity';
import { Columns } from 'src/column/entities/column.entity';
@Injectable()
export class BoardService {
  
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
    @InjectRepository(User)
    private readonly userRepository : Repository<User> ,
    @InjectRepository(Columns)
    private readonly columnRepository : Repository<Columns>
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
  
  async createBoard(userId: string, newBoard: Board, initialColumns: Columns[]): Promise<Board> {
    // Find the user
    const user = await this.userRepository.findOne({ where: { id:userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    // Set the user reference for the new board
    newBoard.user = user;
  
    // Save the new board
    const savedBoard = await this.boardRepository.save(newBoard);
  
    // Create and associate initial columns
    for (const initialColumn of initialColumns) {
      initialColumn.board = savedBoard;
      await this.columnRepository.save(initialColumn);
    }
  
    // Update the user's boards
    user.boards.push(savedBoard);
    await this.userRepository.save(user);
  
    return savedBoard;
  }
  



  async findOne(id: string): Promise<Board> {
    return this.boardRepository.findOne({ where: { id } });
  }


  async updateBoard(boardId: string, updatedBoard: Partial<Board>): Promise<Board | undefined> {
    // Find and update the board
    const board = await this.boardRepository.findOne({where:{id:boardId}});
    if (!board) {
      throw new NotFoundException('Board not found');
    }

    Object.assign(board, updatedBoard);
    await this.boardRepository.save(board);

    return board;
  }

  async deleteBoard(boardId: string): Promise<void> {
    // Find the board
    const board = await this.boardRepository.findOne({ where: { id:boardId } });
    if (!board) {
      throw new NotFoundException('Board not found');
    }

    // Delete the board
    await this.boardRepository.delete(boardId);
  }
}
