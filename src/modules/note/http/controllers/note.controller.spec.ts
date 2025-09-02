import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PrismaProvider } from '../../../../shared/infra/providers/Prisma.provider';
import { AppModule } from '../../../../app/app.module';
import { SharedModule } from '../../../../shared/infra/modules/Shared.module';
import { Environment } from '../../../../shared/config/app.config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { userSeeder } from '../../../../shared/infra/db/prisma/seeders/user.seed';
import { noteSeeder } from '../../../../shared/infra/db/prisma/seeders/note.seed';
import { NoteNotFoundException } from '../../domain/dtos/errors/NoteNotFoundException.exception';
import { NoteController } from './note.controller';

describe('Notes Controller - /notes', () => {
  const controllerRoute = '/notes';
  const userLoginRoute = '/user/login';
  const browseNotesRoute = `${controllerRoute}/browse`;
  const findNoteByIdRoute = `${controllerRoute}/find/:cuid`;
  const createNoteRoute = `${controllerRoute}/create`;
  const editNoteRoute = `${controllerRoute}/edit/:cuid`;
  const deleteNoteRoute = `${controllerRoute}/delete/:cuid`;

  let controller: NoteController;

  let app: INestApplication;
  let prisma: PrismaProvider;
  let jwtToken: string;
  let noteId: string;

  const userLoginData = {
    email: 'usuario_corenotes@gmail.com',
    password: 'senha123',
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule, SharedModule],
      providers: [PrismaProvider],
    })
      .overrideProvider(PrismaProvider)
      .useValue(new PrismaProvider(Environment.TEST))
      .compile();

    prisma = moduleRef.get(PrismaProvider);

    app = moduleRef.createNestApplication<NestExpressApplication>();
    app.useGlobalFilters();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await prisma.seed([userSeeder, noteSeeder]);
    jest.clearAllMocks();
  });

  afterEach(async () => {
    await prisma.clear('all');
  });

  describe('GET /notes/browse', () => {
    it('should return 200 and an array of notes', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post(`${userLoginRoute}`)
        .send(userLoginData)
        .expect(200);

      jwtToken = loginResponse.body.token;

      expect(async () => {
        const notesResponse = await request(app.getHttpServer())
          .get(browseNotesRoute)
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(200);

        noteId = notesResponse.body[0].id_note;

        const response = await request(app.getHttpServer())
          .get(findNoteByIdRoute.replace(':cuid', noteId))
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(200);

        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('id_note');
        expect(response.body).toHaveProperty('note_title');
        expect(response.body).toHaveProperty('note_color');
        expect(response.body).toHaveProperty('note_text');
        expect(response.body).toHaveProperty('starred');
        expect(response.body).toHaveProperty('user_id');
      });
    });
  });

  describe('GET /notes/find/:cuid', () => {
    it('should return 200 and a note object if note is found', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post(`${userLoginRoute}`)
        .send(userLoginData)
        .expect(200);

      jwtToken = loginResponse.body.token;

      expect(async () => {
        const notesResponse = await request(app.getHttpServer())
          .get(browseNotesRoute)
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(200);

        noteId = notesResponse.body[0].id_note;

        const response = await request(app.getHttpServer())
          .get(findNoteByIdRoute.replace(':cuid', noteId))
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(200);

        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('id_note');
        expect(response.body).toHaveProperty('note_title');
        expect(response.body).toHaveProperty('note_color');
        expect(response.body).toHaveProperty('note_text');
        expect(response.body).toHaveProperty('starred');
        expect(response.body).toHaveProperty('user_id');
      });
    });

    it('should return 404 and NoteNotFoundException if note is not found', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post(`${userLoginRoute}`)
        .send(userLoginData)
        .expect(200);

      jwtToken = loginResponse.body.token;
      const response = await request(app.getHttpServer())
        .get(findNoteByIdRoute.replace(':cuid', 'non-existing-cuid'))
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(404);

      expect(response.body).toHaveProperty('statusCode', 404);
      expect(response.body).toHaveProperty(
        'message',
        new NoteNotFoundException().message,
      );
    });
  });
});
