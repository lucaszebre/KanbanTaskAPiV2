/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/tasks.entity';
import { SubtaskModule } from 'src/subtask/subtask.module';
import { Repository } from 'typeorm';
import { Subtask } from 'src/subtask/entities/subtask.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Task,Subtask]),SubtaskModule],
  controllers: [TasksController],
  providers: [TasksService,Repository],
  exports:[TasksService,TypeOrmModule],
})
export class TasksModule {}
