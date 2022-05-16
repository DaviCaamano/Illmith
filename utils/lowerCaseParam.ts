import { TransformFnParams } from 'class-transformer';

export const lowerCaseParam = ({ value }: TransformFnParams): string =>
  value.trim().toLowerCase();
