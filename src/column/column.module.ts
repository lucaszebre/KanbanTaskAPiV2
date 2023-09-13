/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Columns } from './entities/column.entity';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  imports:[TypeOrmModule.forFeature([Columns]),TasksModule],
  controllers: [ColumnController],
  providers: [ColumnService],
  exports:[ColumnService]
})
export class ColumnModule {}
