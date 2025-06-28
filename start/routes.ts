/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const NotesController = () => import('#controllers/notes_controller')

router
  .group(() => {
    router.resource('notes', NotesController).apiOnly()
    router.get('notes/restore/:id', [NotesController, 'restore'])
  })
  .prefix('/api')
