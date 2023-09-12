/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/tasks.entity';
import { Repository } from 'typeorm';
@Module({
  imports:[TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService,Repository],
  exports:[TasksService],
})
export class TasksModule {}
