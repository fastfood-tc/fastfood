import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateCustomerDto {
  @IsOptional()
  @Length(11, 11)
  @ApiProperty({ required: false })
  cpf?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  name?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ required: false })
  email?: string;
}
