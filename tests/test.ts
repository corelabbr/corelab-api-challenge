import request from 'supertest';
import { createApp } from '../src/Infrastructures/express/createApp';


let app: any;
let createdTaskId: string;

beforeAll(async () => {
    app = await createApp();
});

describe('🔁 Integração: ciclo de vida completo da Task', () => {

    it('🟢 Criar uma task (POST /task)', async () => {
        const res = await request(app)
            .post('/task')
            .send({ title: 'Tarefa Integração', is_favorite: false, color: '#123456' });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('message', 'Task created');
        expect(res.body).toHaveProperty('id');

        createdTaskId = res.body.id;
    });

    it('📥 Listar todas as tasks (GET /task)', async () => {
        const res = await request(app).get('/task');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        const task = res.body.find((t: any) => t.id === createdTaskId);
        expect(task).toBeDefined();
        expect(task.title).toBe('Tarefa Integração');
    });

    it('🔍 Buscar task por ID (GET /task/:id)', async () => {
        const res = await request(app).get(`/task/${createdTaskId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', createdTaskId);
        expect(res.body).toHaveProperty('title', 'Tarefa Integração');
    });

    it('✏️ Atualizar a task (PUT /task)', async () => {
        const res = await request(app)
            .put('/task')
            .send({
                id: createdTaskId,
                title: 'Task Atualizada',
                is_favorite: true,
                color: '#654321'
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'Task updated');
    });

    it('⭐ Listar favoritas (GET /task/star/favorite)', async () => {
        const res = await request(app).get('/task/star/favorite');

        expect(res.statusCode).toBe(200);
        const task = res.body.find((t: any) => t.id === createdTaskId);
        expect(task).toBeDefined();
        expect(task.is_favorite).toBe(1);
    });

    it('🗑️ Deletar a task (DELETE /task/:id)', async () => {
        const res = await request(app).delete(`/task/${createdTaskId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'Task deleted');
    });
});
