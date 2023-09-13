/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Columns } from './entities/column.entity';
import { TasksModule } from 'src/tasks/tasks.module';
import { SubtaskModule } from 'src/subtask/subtask.module';
import { Repository } from 'typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Columns]),TasksModule,SubtaskModule],
  controllers: [ColumnController],
  providers: [ColumnService,Repository],
  exports:[ColumnService]
})
export class ColumnModule {}
