/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BoardService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/boards.entity';
import { ColumnModule } from 'src/column/column.module';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Columns } from 'src/column/entities/column.entity';
import { Subtask } from 'src/subtask/entities/subtask.entity';
import { Task } from 'src/tasks/entities/tasks.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Board,User,Columns,Task,Subtask]),ColumnModule,],
  controllers: [BoardsController],
  providers: [BoardService,Repository],
  exports:[BoardService,TypeOrmModule]
})
export class BoardsModule {}
