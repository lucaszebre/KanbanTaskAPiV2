/* eslint-disable prettier/prettier */
// board-create.dto.ts

import { IsString, IsArray } from '@nestjs/class-validator';

export class BoardCreateDto {
    @IsString()
    name: string;

    @IsArray()
    columns: string[];
}
