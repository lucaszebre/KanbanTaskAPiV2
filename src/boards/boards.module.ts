/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BoardService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/boards.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Board])],
  controllers: [BoardsController],
  providers: [BoardService],
  exports:[BoardService]
})
export class BoardsModule {}
