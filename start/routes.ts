import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const NotesController = () => import('#controllers/notes_controller')
const AuthController = () => import('#controllers/auth_controller')
const UserController = () => import('#controllers/user_controller')

router
  .group(() => {
    router.resource('notes', NotesController).apiOnly().use('*', middleware.auth())
    router.post('notes/restore/:id', [NotesController, 'restore']).use(middleware.auth())

    router.group(() => {
      router.post('register', [AuthController, 'register'])
      router.post('login', [AuthController, 'login'])
      router.post('logout', [AuthController, 'logout']).use(middleware.auth())
    })

    router.get('user', [UserController, 'show']).use(middleware.auth())
    router
      .group(() => {
        router.patch('update', [UserController, 'update']).use(middleware.auth())
        router
          .group(() => {
            router.post('avatar', [UserController, 'updateAvatar']).use(middleware.auth())
            router.patch('password', [UserController, 'updatePassword']).use(middleware.auth())
          })
          .prefix('update')
      })
      .prefix('user')
  })
  .prefix('api')
