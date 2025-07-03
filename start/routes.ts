import router from '@adonisjs/core/services/router'

const NotesController = () => import('#controllers/notes_controller')

router
  .group(() => {
    router.resource('notes', NotesController).apiOnly()
    router.post('notes/restore/:id', [NotesController, 'restore'])
  })
  .prefix('api')
