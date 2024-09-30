import { ValidationPipe } from '@nestjs/common';
import { ClassTransformOptions } from 'class-transformer';
import { serializerOptions } from '../interceptor/serializer.interceptor';

export const ValidatorOptions: {
  transform: boolean;
  whitelist: boolean;
  validationError: {
    target: boolean;
    value: boolean;
  };
  transformOptions: ClassTransformOptions;
} = {
  transform: true,
  whitelist: true,
  validationError: {
    target: true,
    value: true,
  },
  transformOptions: serializerOptions,
};

export const GlobalValidationPipe = new ValidationPipe(ValidatorOptions);
