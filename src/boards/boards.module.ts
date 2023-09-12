/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CommentsService } from './boards.service';
import { CommentsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/boards.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Board])],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports:[CommentsService]
})
export class CommentsModule {}
