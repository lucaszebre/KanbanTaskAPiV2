/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Columns } from './entities/column.entity';
import { TasksModule } from 'src/tasks/tasks.module';
import { SubtaskModule } from 'src/subtask/subtask.module';
import { Repository } from 'typeorm';
import { Task } from 'src/tasks/entities/tasks.entity';
import { Subtask } from 'src/subtask/entities/subtask.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Columns,Task,Subtask]),TasksModule,SubtaskModule],
  controllers: [ColumnController],
  providers: [ColumnService,Repository],
  exports:[ColumnService]
})
export class ColumnModule {}
