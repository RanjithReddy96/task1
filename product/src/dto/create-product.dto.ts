import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    description: string;
    @IsNotEmpty()
    @IsNumber()
    price: number;
  }
  