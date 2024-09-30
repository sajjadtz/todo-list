import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpErrorFilter } from './shared/configs/filter/http-error.filter';
import { ErrorFilter } from './shared/configs/filter/error.filter';
import { SerializerInterceptor } from './shared/interceptor/serializer.interceptor';
import { GlobalValidationPipe } from './shared/pipes/global-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalInterceptors(SerializerInterceptor(app));

  app.useGlobalPipes(GlobalValidationPipe);

  app.useGlobalFilters(new ErrorFilter());
  app.useGlobalFilters(new HttpErrorFilter());

  await app.listen(3010);
}
bootstrap();
