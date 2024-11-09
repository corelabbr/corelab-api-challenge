import request from 'supertest'
import { StatusCodes } from 'http-status-codes'
import { HttpServer } from '../../../src/config/http-server'
import { sequelize } from '../../../src/infra/db/sequelize'
import { findByColorNotesService } from '../../../src/app/services/FindByColorNotesService'

jest.mock('../../../src/app/services/FindByColorNotesService')

describe('FindByColorNotesController Integration Tests', () => {
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

    it('should return notes filtered by color successfully', async () => {
        const mockNotes = [
            { id: '1', title: 'Note 1', text: 'Text 1', color: 'blue', favorite: false },
            { id: '2', title: 'Note 2', text: 'Text 2', color: 'blue', favorite: true }
        ]
        findByColorNotesService.findByColor = jest.fn().mockResolvedValue(mockNotes)

        const response = await request(server.app)
            .get('/notes/color/blue')
            .expect(StatusCodes.OK)

        expect(response.body).toEqual(mockNotes)
    }, 10000)

    it('should handle no notes found for the given color', async () => {
        findByColorNotesService.findByColor = jest.fn().mockResolvedValue([])

        const response = await request(server.app)
            .get('/notes/color/green')
            .expect(StatusCodes.OK)

        expect(response.body).toEqual([])
    }, 10000)

    it('should handle internal server errors', async () => {
        findByColorNotesService.findByColor = jest.fn().mockRejectedValue(new Error('Database error'))

        const response = await request(server.app)
            .get('/notes/color/blue')
            .expect(StatusCodes.INTERNAL_SERVER_ERROR)

        expect(response.body).toEqual({ error: 'Internal server error!' })
    }, 10000)
})
