/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BoardService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/boards.entity';
import { ColumnModule } from 'src/column/column.module';
import { Repository } from 'typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Board]),ColumnModule],
  controllers: [BoardsController],
  providers: [BoardService,Repository],
  exports:[BoardService]
})
export class BoardsModule {}
