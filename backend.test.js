const request = require('supertest');
const app = require('./server'); // Ajuste o caminho conforme a estrutura do seu projeto

describe('API /api/notes', () => {
    it('deve retornar um array de notas', async () => {
        const res = await request(app).get('/api/notes');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});
