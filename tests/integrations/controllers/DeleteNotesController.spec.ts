import request from 'supertest'
import { StatusCodes } from 'http-status-codes'
import { findByIdNotesService } from '../../../src/app/services/FindByIdNotesService'
import { deleteNotesService } from '../../../src/app/services/DeleteNotesService'
import { HttpServer } from '../../../src/config/http-server'
import { sequelize } from '../../../src/infra/db/sequelize'

jest.mock('../../../src/app/services/FindByIdNotesService.ts')
jest.mock('../../../src/app/services/DeleteNotesService')


describe('DeleteNotesController Integration Tests', () => {
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

    it('should delete a note successfully', async () => {
        findByIdNotesService.findById = jest.fn().mockResolvedValue({ id: 'existing-id' })
        deleteNotesService.delete = jest.fn().mockResolvedValue(undefined)

        const response = await request(server.app)
            .delete('/notes/existing-id')
            .expect(StatusCodes.NO_CONTENT)

        expect(response.body).toEqual({})
    }, 10000)

    it('should return an error when note is not found', async () => {
        findByIdNotesService.findById = jest.fn().mockResolvedValue(null)

        const response = await request(server.app)
            .delete('/notes/existing-id')
            .expect(StatusCodes.NOT_FOUND)

        expect(response.body).toEqual({ error: "Notes not found!" })
    }, 10000)


    it('should handle internal server errors', async () => {
        findByIdNotesService.findById = jest.fn().mockRejectedValue(new Error('Database error'))

        const response = await request(server.app)
            .delete('/notes/existing-id')
            .expect(StatusCodes.INTERNAL_SERVER_ERROR)

        expect(response.body).toEqual({ error: 'Internal server error!' })
    }, 10000)
})
