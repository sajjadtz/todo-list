import { INestApplication, VersioningType } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { ErrorFilter } from 'src/shared/filter/error.filter';
import { HttpErrorFilter } from 'src/shared/filter/http-error.filter';
import { GlobalValidationPipe } from 'src/shared/pipes/global-validation.pipe';
import * as request from 'supertest';

describe('TodoList (e2e)', () => {
  let app: INestApplication;
  let accessToken: String;
  let createdTodoListId: String;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(GlobalValidationPipe);

    app.useGlobalFilters(new ErrorFilter());
    app.useGlobalFilters(new HttpErrorFilter());
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
      prefix: 'api/v',
    });
    await app.init();

    await request(app.getHttpServer()).post('/api/v1/users/sign-up').send({
      username: 'test',
      password: 'test',
    });

    accessToken = (
      await request(app.getHttpServer()).post('/api/v1/users/login').send({
        username: 'test',
        password: 'test',
      })
    ).body.accessToken;
  });

  afterAll(async () => {
    await app.close();
    global.gc && global.gc();
    jest.resetModules();
  });

  it(`Create TodoList`, async () => {
    const userResponseBeforeCreate = await request(app.getHttpServer())
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(userResponseBeforeCreate.body.lists.length).toBe(0);

    const response = await request(app.getHttpServer())
      .post('/api/v1/todo-list')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'test todo lits',
      });
    expect(response.status).toBe(201);

    const userResponseAfterCreate = await request(app.getHttpServer())
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(userResponseAfterCreate.body.lists.length).toBe(1);
    expect(userResponseAfterCreate.body.lists[0].title).toBe('test todo lits');
    createdTodoListId = userResponseAfterCreate.body.lists[0].id;
    expect(userResponseAfterCreate.body.lists[0].user.id).toBe(
      userResponseAfterCreate.body.id,
    );
  });

  it(`Create TodoList with wrong data`, async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/todo-list')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({});

    expect(response.status).toBe(400);
  });

  it(`Find TodoList with correct id`, async () => {
    const response = await request(app.getHttpServer())
      .get(`/api/v1/todo-list/${createdTodoListId}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(createdTodoListId);
  });

  it(`Find TodoList with wrong id`, async () => {
    const response = await request(app.getHttpServer())
      .get(`/api/v1/todo-list/000000000000000000000000`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(404);
  });

  it(`Update TodoList with correct id and data`, async () => {
    const responseBeforeUpdate = await request(app.getHttpServer())
      .get(`/api/v1/todo-list/${createdTodoListId}`)
      .set('Authorization', `Bearer ${accessToken}`);

    const response = await request(app.getHttpServer())
      .patch(`/api/v1/todo-list/${createdTodoListId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'updated todo list',
      });

    expect(response.status).toBe(200);

    const responseAfterUpdate = await request(app.getHttpServer())
      .get(`/api/v1/todo-list/${createdTodoListId}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(responseAfterUpdate.body.title).not.toBe(
      responseBeforeUpdate.body.title,
    );
  });

  it(`Update TodoList with wrong id`, async () => {
    const response = await request(app.getHttpServer())
      .patch(`/api/v1/todo-list/000000000000000000000000`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'updated todo list',
      });

    expect(response.status).toBe(404);
  });

  it(`Delete TodoList`, async () => {
    const userResponseBeforeDelete = await request(app.getHttpServer())
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(userResponseBeforeDelete.body.lists.length).toBe(1);

    const response = await request(app.getHttpServer())
      .delete(`/api/v1/todo-list/${createdTodoListId}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(200);

    const userResponseAfterDelete = await request(app.getHttpServer())
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(userResponseAfterDelete.body.lists.length).toBe(0);
  });
});
