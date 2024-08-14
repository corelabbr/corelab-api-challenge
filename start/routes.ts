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

router.get('/', () => {
  return 'Welcome to the CoreNotes API!'
})

router
  .group(() => {
    router.get('/', [NotesController, 'index'])
    router.post('/', [NotesController, 'store'])

    router
      .group(() => {
        router.put('/title', [NotesController, 'updateTitle'])
        router.put('/content', [NotesController, 'updateContent'])
        router.put('/color', [NotesController, 'updateColor'])
        router.put('/favorite', [NotesController, 'toggleFavorite'])
        router.delete('/', [NotesController, 'destroy'])
      })
      .prefix('/:id')
  })
  .prefix('/notes')
