import request from 'supertest'
import { StatusCodes } from 'http-status-codes'
import { HttpServer } from '../../../src/config/http-server'
import { sequelize } from '../../../src/infra/db/sequelize'
import { findAllNotesService } from '../../../src/app/services/FindAllNotesService'

jest.mock('../../../src/app/services/FindAllNotesService')

describe('FindAllNotesController Integration Tests', () => {
    let server: HttpServer

    beforeAll(async () => {
        server = new HttpServer()
        await sequelize.sync({ force: true })
    })

    beforeEach(() => {
        jest.resetAllMocks()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it('should return all notes successfully', async () => {
        const mockNotes = [
            { id: '1', title: 'Note 1', text: 'Text 1', color: 'blue', favorite: false },
            { id: '2', title: 'Note 2', text: 'Text 2', color: 'red', favorite: true }
        ]
        findAllNotesService.findAll = jest.fn().mockResolvedValue(mockNotes)

        const response = await request(server.app)
            .get('/notes')
            .expect(StatusCodes.OK)

        expect(response.body).toEqual(mockNotes)
    }, 10000)

    it('should handle internal server errors', async () => {
        findAllNotesService.findAll = jest.fn().mockRejectedValue(new Error('Database error'))

        const response = await request(server.app)
            .get('/notes')
            .expect(StatusCodes.INTERNAL_SERVER_ERROR)

        expect(response.body).toEqual({ error: 'Internal server error!' })
    }, 10000)
})
