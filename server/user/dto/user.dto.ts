import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { lowerCaseParam } from '@utils';

export class userDto {
  @IsNotEmpty()
  @Transform(lowerCaseParam)
  identifier: string;

  @IsNotEmpty()
  @Transform(lowerCaseParam)
  password: string;
}

export class registerUserDto {
  @IsNotEmpty()
  @Transform(lowerCaseParam)
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsBoolean()
  subscribe: boolean;

  @IsOptional()
  @Transform(lowerCaseParam)
  username: string;
}
