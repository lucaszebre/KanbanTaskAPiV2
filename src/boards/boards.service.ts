/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Board } from './entities/boards.entity'
import { User } from 'src/users/user.entity';
import { Columns } from 'src/column/entities/column.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/tasks/entities/tasks.entity';
import { Subtask } from 'src/subtask/entities/subtask.entity';
@Injectable()
export class BoardService {
  
  
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(User)
    private   userRepository : Repository<User> ,
    @InjectRepository(Columns)
    private  columnRepository : Repository<Columns>,
    @InjectRepository(Task)
    private taskRepository : Repository<Task>,
    @InjectRepository(Subtask)
    private subtaskRepository : Repository<Subtask>
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
  
  async createBoard(userId: string, nameBoard: string, initialColumns: string[]): Promise<void> {
    // Find the user
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    const newBoard = new Board();
  
    // Set the user reference for the new board
    newBoard.user = user;
  
    newBoard.name = nameBoard;
    // Save the new board
    const savedBoard = await this.boardRepository.save(newBoard);
  
    // Create and associate initial columns using column names
    for (const initial of initialColumns) {
      const initialColumn = new Columns(); // Create a new instance of Columns
      initialColumn.name = initial;
      initialColumn.board = savedBoard;
      await this.columnRepository.save(initialColumn);
    }
  
   
  }
  
  



  async findOne(id: string): Promise<Board> {
    return this.boardRepository.findOne({
      where: { id },
      relations: ['columns', 'columns.tasks', 'columns.tasks.subtasks'],
    });
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
    const board = await this.boardRepository.findOne({ where: { id: boardId }, relations: ['columns', 'columns.tasks', 'columns.tasks.subtasks'] });
    
    if (!board) {
      throw new NotFoundException('Board not found');
    }
  
    // Delete subtasks associated with tasks
    for (const column of board.columns) {
      for (const task of column.tasks) {
        for (const subtask of task.subtasks) {
          await this.subtaskRepository.remove(subtask);
        }
        await this.taskRepository.remove(task);
      }
    }
  
    // Delete columns
    await this.columnRepository.remove(board.columns);
  
    // Delete the board
    await this.boardRepository.remove(board);
  }

  async createColumnBoard(boardId: string, name: string): Promise<void> {
    // Find the user
    const board = await this.boardRepository.findOne({ where: { id: boardId } });
    if (!board) {
      throw new NotFoundException('User not found');
    }
  
    const newColumn = new Columns();
  
    // Set the user reference for the new board
    newColumn.board = board;
  
    newColumn.name = name;
    // Save the new board
    const savedColumn = await this.columnRepository.save(newColumn);
  
    
  
   
  }
}
