import multer from 'multer'
import path from 'path'
export const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads')
  },
  filename: (req, file, callback) => {
    const time = new Date().getTime()
    const pathextName = path.extname(file.originalname)
    callback(null, `${time}${pathextName}`)
  }
})
