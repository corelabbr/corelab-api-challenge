import supertest from 'supertest'
import { assert } from '@japa/assert'
import { test } from '@japa/runner'
import Task from 'App/Models/Task'
import Database from '@ioc:Adonis/Lucid/Database'
import app from 'App/Server'

const request = supertest(app)

test.group('TasksController', (group) => {
    group.beforeEach(async () => {
        await Database.beginGlobalTransaction()
    })

    group.afterEach(async () => {
        await Database.rollbackGlobalTransaction()
    })

    test('should list all tasks', async ({ assert }) => {
        await Task.create({ title: 'Test Task', description: 'Test Description' })
        const response = await request.get('/tasks').expect(200)
        assert.isArray(response.body)
        assert.lengthOf(response.body, 1)
    })

    test('should create a new task', async ({ assert }) => {
        const taskData = { title: 'New Task', description: 'New Description', isCompleted: false, isFavorite: false, color: 'red' }
        const response = await request.post('/tasks').send(taskData).expect(201)
        assert.equal(response.body.title, taskData.title)
        assert.equal(response.body.description, taskData.description)
    })

    test('should show a specific task', async ({ assert }) => {
        const task = await Task.create({ title: 'Test Task', description: 'Test Description' })
        const response = await request.get(`/tasks/${task.id}`).expect(200)
        assert.equal(response.body.id, task.id)
    })

    test('should update a task', async ({ assert }) => {
        const task = await Task.create({ title: 'Test Task', description: 'Test Description' })
        const updatedData = { title: 'Updated Task', description: 'Updated Description' }
        const response = await request.put(`/tasks/${task.id}`).send(updatedData).expect(200)
        assert.equal(response.body.title, updatedData.title)
        assert.equal(response.body.description, updatedData.description)
    })

    test('should delete a task', async ({ assert }) => {
        const task = await Task.create({ title: 'Test Task', description: 'Test Description' })
        await request.delete(`/tasks/${task.id}`).expect(204)
        const deletedTask = await Task.find(task.id)
        assert.isNull(deletedTask)
    })

    test('should toggle favorite status of a task', async ({ assert }) => {
        const task = await Task.create({ title: 'Test Task', description: 'Test Description', isFavorite: false })
        const response = await request.patch(`/tasks/${task.id}/toggleFavorite`).expect(200)
        assert.isTrue(response.body.isFavorite)
    })
})