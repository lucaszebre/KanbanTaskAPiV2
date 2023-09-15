/* eslint-disable prettier/prettier */
import { Columns } from 'src/column/entities/column.entity';
import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Board {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    name: string;
  
  @ManyToOne(() => User, (user) => user.boards,)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Columns, (column) => column.board,{ cascade: true })
  columns: Columns[];
    
}




