/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SubtaskController } from './subtask.controller';
import { SubtaskService } from './subtask.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subtask } from './entities/subtask.entity';
import { Repository } from 'typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Subtask])],
  controllers: [SubtaskController],
  providers: [SubtaskService,Repository],
  exports:[SubtaskService]
})
export class SubtaskModule {}
