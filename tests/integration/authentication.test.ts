import httpStatus from 'http-status'
import supertest from 'supertest'
import { createRequestBody, createUserParams, createdUser } from '../factories'
import { cleanDb } from '../helpers'
import app, { init } from '@/app'
import { duplicatedEmailError, invalidInputError } from '@/errors'

beforeAll(async () => {
  await init()
  await cleanDb()
})

const server = supertest(app)

describe('User Registration', () => {
  it('should create a new user with valid data', async () => {
    const dataUser = createRequestBody()

    const response = await server
      .post('/sign-up')
      .send(dataUser)
      .expect(httpStatus.CREATED)

    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('name', dataUser.name)
    expect(response.body).toHaveProperty('email', dataUser.email)
  })

  it('should return an error for invalid user data', async () => {
    const invalidUserData = {
      name: 'test',
      email: 'email@gmail.com',
    }

    const response = await server
      .post('/sign-up')
      .send(invalidUserData)
      .expect(httpStatus.BAD_REQUEST)

    expect(response.body.message).toEqual(
      invalidInputError('All fields are mandatory.').message,
    )
  })

  it('should return an error when trying to register a user with a duplicate email', async () => {
    await createdUser({
      name: 'Test',
      email: 'email@gmail.com',
      password: 'password123',
    })
    const userParams = createUserParams(
      'Kaio',
      'email@gmail.com',
      'password123',
    )

    const response = await server
      .post('/sign-up')
      .send(userParams)
      .expect(httpStatus.CONFLICT)

    expect(response.body.message).toEqual(duplicatedEmailError().message)
  })

  it('should return an error when trying to register a user without providing a password', async () => {
    const userParams = createUserParams('NewUser', 'newuser@gmail.com', '')

    const response = await server
      .post('/sign-up')
      .send(userParams)
      .expect(httpStatus.BAD_REQUEST)

    expect(response.body.message).toEqual(
      invalidInputError('All fields are mandatory.').message,
    )
  })
})

describe('User Login', () => {
  it('should login with valid credentials', async () => {
    const user = createRequestBody()
    const dataLogin = {
      email: user.email,
      password: user.password,
    }

    await server.post('/sign-in').send(dataLogin)

    expect(httpStatus.OK)
  })

  it('should return an error for invalid login credentials', async () => {
    // Faça uma solicitação de login com credenciais inválidas
    const invalidLoginCredentials = {
      email: 'nonexistentuser@gmail.com',
      password: 'invalidpassword',
    }

    await server
      .post('/sign-in')
      .send(invalidLoginCredentials)
      .expect(httpStatus.NOT_FOUND)
  })

  it('should return an error when trying to login without providing an email', async () => {
    // Faça uma solicitação de login sem fornecer um email
    const loginWithoutEmail = {
      password: 'password123',
    }

    const response = await server
      .post('/sign-in')
      .send(loginWithoutEmail)
      .expect(httpStatus.UNAUTHORIZED)

    expect(response.body.message).toEqual(
      invalidInputError('email or password are incorrect').message,
    )
  })

  it('should return an error when trying to login without providing a password', async () => {
    const loginWithoutPassword = {
      email: 'testuser@gmail.com',
    }

    const response = await server
      .post('/sign-in')
      .send(loginWithoutPassword)
      .expect(httpStatus.UNAUTHORIZED)

    expect(response.body.message).toEqual(
      invalidInputError('email or password are incorrect').message,
    )
  })
})
