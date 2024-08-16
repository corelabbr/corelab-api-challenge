import request from 'supertest'
import { StatusCodes } from 'http-status-codes'
import { HttpServer } from '../../../src/config/http-server'
import { sequelize } from '../../../src/infra/db/sequelize'
import { findByFavoriteNotesService } from '../../../src/app/services/FindByFavoriteNotesService'

jest.mock('../../../src/app/services/FindByFavoriteNotesService')

describe('FindByFavoriteNotesController Integration Tests', () => {
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

    it('should return favorite notes successfully', async () => {
        const mockNotes = [
            { id: '1', title: 'Favorite Note 1', text: 'Text 1', color: 'red', favorite: true },
            { id: '2', title: 'Favorite Note 2', text: 'Text 2', color: 'blue', favorite: true }
        ]
        findByFavoriteNotesService.findByFavorite = jest.fn().mockResolvedValue(mockNotes)

        const response = await request(server.app)
            .get('/notes/favorite/true')
            .expect(StatusCodes.OK)

        expect(response.body).toEqual(mockNotes)
    }, 10000)

    it('should return non-favorite notes successfully', async () => {
        const mockNotes = [
            { id: '3', title: 'Note 1', text: 'Text 1', color: 'yellow', favorite: false },
            { id: '4', title: 'Note 2', text: 'Text 2', color: 'green', favorite: false }
        ]
        findByFavoriteNotesService.findByFavorite = jest.fn().mockResolvedValue(mockNotes)

        const response = await request(server.app)
            .get('/notes/favorite/false')
            .expect(StatusCodes.OK)

        expect(response.body).toEqual(mockNotes)
    }, 10000)

    it('should handle no notes found for the given favorite status', async () => {
        findByFavoriteNotesService.findByFavorite = jest.fn().mockResolvedValue([])

        const response = await request(server.app)
            .get('/notes/favorite/true')
            .expect(StatusCodes.OK)

        expect(response.body).toEqual([])
    }, 10000)

    it('should handle internal server errors', async () => {
        findByFavoriteNotesService.findByFavorite = jest.fn().mockRejectedValue(new Error('Database error'))

        const response = await request(server.app)
            .get('/notes/favorite/true')
            .expect(StatusCodes.INTERNAL_SERVER_ERROR)

        expect(response.body).toEqual({ error: 'Internal server error!' })
    }, 10000)
})