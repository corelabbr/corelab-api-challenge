import multer from 'multer'

const MB = 2 * 1024 * 1024

export const multerConfig: multer.Options = {
  dest: 'uploads',
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, 'uploads')
    },
    filename: (_req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`)
    },
  }),
  limits: {
    fileSize: MB,
  },
  fileFilter: (_req, _file, cb) => {
    cb(null, true)
  },
}
