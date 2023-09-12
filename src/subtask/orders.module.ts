/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SubtaskController } from './orders.controller';
import { SubtaskService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subtask } from './entities/subtask.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Subtask])],
  controllers: [SubtaskController],
  providers: [SubtaskService],
  exports:[SubtaskService]
})
export class SubtaskModule {}
