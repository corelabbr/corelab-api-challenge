import app, { init } from '@/app'

const port = +process.env.PORT || 5000
console.log('PORT from process.env:', process.env.PORT)
console.log('PORT used:', port)

init().then(() => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`)
  })
})
