import { join } from 'path';
import { diskStorage } from 'multer';

export default {
  root: join(process.cwd(), '/uploads'),
  storage: diskStorage({
    destination: join(process.cwd(), `/uploads/${new Date().toLocaleDateString().replace(/\//g, '')}`),
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const filename = `${uniqueSuffix}_${file.originalFileName}`;
      return cb(null, filename);
    },
  })
}