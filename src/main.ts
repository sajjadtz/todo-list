import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpErrorFilter } from './shared/filter/http-error.filter';
import { ErrorFilter } from './shared/filter/error.filter';
import { SerializerInterceptor } from './shared/interceptor/serializer.interceptor';
import { GlobalValidationPipe } from './shared/pipes/global-validation.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(SerializerInterceptor(app));

  app.useGlobalPipes(GlobalValidationPipe);

  app.useGlobalFilters(new ErrorFilter());
  app.useGlobalFilters(new HttpErrorFilter());

  const document = new DocumentBuilder()
    .setTitle('todo-list')
    .setDescription('description')
    .setVersion('v1')
    .addBearerAuth();
  const openApiObject = SwaggerModule.createDocument(app, document.build());
  SwaggerModule.setup('docs/index', app, openApiObject, {});

  await app.listen(3000);
}
bootstrap();
