import request from 'supertest'
import { StatusCodes } from 'http-status-codes'
import { HttpServer } from '../../../src/config/http-server'
import { sequelize } from '../../../src/infra/db/sequelize'
import { updateNotesService } from '../../../src/app/services/UpdateNotesService'

jest.mock('../../../src/app/services/UpdateNotesService')

describe('UpdateNotesController Integration Tests', () => {
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

    it('should update a note successfully', async () => {
        const mockUpdatedNote = {
            id: 'existing-id',
            title: 'Updated Title',
            text: 'Updated Text',
            color: 'blue',
            favorite: true
        }
        updateNotesService.update = jest.fn().mockResolvedValue(mockUpdatedNote)

        const response = await request(server.app)
            .put('/notes/existing-id')
            .send({
                title: 'Updated Title',
                text: 'Updated Text',
                color: 'blue',
                favorite: true
            })
            .expect(StatusCodes.OK)

        expect(response.body).toEqual(mockUpdatedNote)
    }, 10000)

    it('should return empty when id is not provided', async () => {
        const response = await request(server.app)
            .put('/notes/')
            .send({
                title: 'Updated Title'
            })
            .expect(StatusCodes.NOT_FOUND)

        expect(response.body).toEqual({})
    }, 10000)

    it('should return an error when no fields to update are provided', async () => {
        const response = await request(server.app)
            .put('/notes/existing-id')
            .send({})
            .expect(StatusCodes.UNPROCESSABLE_ENTITY)

        expect(response.body).toEqual({ error: 'Id and at least one field to update are required!' })
    }, 10000)

    it('should return an error when the note is not found', async () => {
        updateNotesService.update = jest.fn().mockResolvedValue(null)

        const response = await request(server.app)
            .put('/notes/non-existing-id')
            .send({
                title: 'Updated Title'
            })
            .expect(StatusCodes.NOT_FOUND)

        expect(response.body).toEqual({ error: 'Notes not found!' })
    }, 10000)

    it('should return an error when there is a database error', async () => {
        updateNotesService.update = jest.fn().mockRejectedValue(new Error('Database error'))

        const response = await request(server.app)
            .put('/notes/existing-id')
            .send({
                title: 'Updated Title'
            })
            .expect(StatusCodes.INTERNAL_SERVER_ERROR)

        expect(response.body).toEqual({ error: 'Internal server error!' })
    }, 10000)
})