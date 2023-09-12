/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Columns } from './entities/column.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(Columns)
    private columnsRepository: Repository<Columns>,
  ) {}
  async create(Columns: Partial<Columns>): Promise<Columns> {
    const newuser = this.columnsRepository.create(Columns);
    return this.columnsRepository.save(newuser);
  }

  async findAll(): Promise<Columns[]> {
    return this.columnsRepository.find();
  }
  


  async findOne(id: string): Promise<Columns> {
    return this.columnsRepository.findOne({ where: { id } });
  }

  async update(id: string, Board: Partial<Columns>): Promise<Columns> {
    await this.columnsRepository.update(id, Board);
    return this.columnsRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.columnsRepository.delete(id);
  }
}
